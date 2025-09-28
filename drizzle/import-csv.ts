import { config } from 'dotenv';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { players, tournaments, matches, playersOnMatches } from '../app/lib/database/schema.js';
import { session } from '../app/lib/database/auth-schema.js';
import * as schemaAuth from '../app/lib/database/auth-schema.js';
import * as schemaApp from '../app/lib/database/schema.js';

// Load environment variables first
config();

// Verify environment variables
if (!process.env.DATABASE_URL) {
	console.error('❌ DATABASE_URL environment variable is not set');
	process.exit(1);
}

// Create database client directly here to avoid import issues
const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle({
	client,
	schema: {
		...schemaApp,
		...schemaAuth,
	},
});

// CSV file to table mapping (excluding users.csv as requested)
const CSV_TABLE_MAPPING = {
	'players.csv': players,
	'tournaments.csv': tournaments,
	'matches.csv': matches,
	'playersOnMatches.csv': playersOnMatches,
	'sessions.csv': session,
} as const;

// Type conversion utilities
const convertValue = (value: string, columnType: string): string | number | boolean | Date | null => {
	if (value === '' || value === 'NULL') return null;

	switch (columnType) {
		case 'boolean':
			return value.toLowerCase() === 'true' || value === '1';
		case 'number':
			return Number(value);
		case 'timestamp':
			return new Date(value);
		default:
			return value;
	}
};

// Table-specific data transformers
const transformData = (filename: string, rawData: Record<string, string>[]): Record<string, unknown>[] => {
	switch (filename) {
		case 'players.csv':
			return rawData.map(row => ({
				id: row.id,
				name: row.name,
				picture: row.picture || null,
				isActive: convertValue(row.isActive, 'boolean'),
				isDeleted: convertValue(row.isDeleted, 'boolean'),
			}));

		case 'tournaments.csv':
			return rawData.map(row => ({
				id: row.id,
				title: row.title,
				isActive: convertValue(row.isActive, 'boolean'),
			}));

		case 'matches.csv':
			return rawData.map(row => ({
				id: row.id,
				date: convertValue(row.date, 'timestamp'),
				tournamentId: row.tournamentId,
			}));

		case 'playersOnMatches.csv':
			return rawData.map(row => ({
				playerId: row.playerId,
				matchId: row.matchId,
				points: convertValue(row.points, 'number'),
			}));

		case 'sessions.csv':
			return rawData.map(row => ({
				id: row.id,
				expiresAt: convertValue(row.expiresAt, 'timestamp'),
				userId: row.userId,
				// Add other session fields with defaults as needed
				token: row.token || row.id, // Use id as token if not provided
				createdAt: new Date(),
				updatedAt: new Date(),
				ipAddress: null,
				userAgent: null,
			}));

		default:
			return rawData;
	}
};

// Read and parse CSV file
const readCSV = (filePath: string): Record<string, string>[] => {
	console.log(`Reading CSV file: ${filePath}`);

	if (!fs.existsSync(filePath)) {
		console.warn(`File not found: ${filePath}`);
		return [];
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const records = parse(fileContent, {
		columns: true,
		skip_empty_lines: true,
		trim: true,
	}) as Record<string, string>[];

	console.log(`Parsed ${records.length} records from ${path.basename(filePath)}`);
	return records;
};

// Clear all tables in reverse dependency order
async function clearAllTables() {
	console.log('🧹 Clearing existing data in reverse dependency order...');

	const clearOrder = [
		{ table: playersOnMatches, name: 'PlayersOnMatches' },
		{ table: matches, name: 'Match' },
		{ table: players, name: 'Player' },
		{ table: tournaments, name: 'Tournament' },
	];

	for (const { table, name } of clearOrder) {
		try {
			await db.delete(table);
			console.log(`✅ Cleared ${name} table`);
		} catch (error) {
			console.warn(`⚠️ Could not clear ${name} table:`, error);
		}
	}
	console.log('');
}

// Import data for a specific table (without clearing individual tables)
const importTableData = async (filename: string) => {
	const table = CSV_TABLE_MAPPING[filename as keyof typeof CSV_TABLE_MAPPING];
	if (!table) {
		console.warn(`No table mapping found for ${filename}`);
		return;
	}

	const filePath = path.join('backups', filename);
	const rawData = readCSV(filePath);

	if (rawData.length === 0) {
		console.log(`No data to import for ${filename}`);
		return;
	}

	const transformedData = transformData(filename, rawData);

	try {
		console.log(`Importing ${transformedData.length} records into ${filename.replace('.csv', '')} table...`);

		// Insert new data in batches to avoid memory issues
		const batchSize = 100;
		for (let i = 0; i < transformedData.length; i += batchSize) {
			const batch = transformedData.slice(i, i + batchSize);
			await db.insert(table).values(batch);
			console.log(`Imported batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(transformedData.length / batchSize)}`);
		}

		console.log(`✅ Successfully imported ${transformedData.length} records into ${filename.replace('.csv', '')} table`);
	} catch (error) {
		console.error(`❌ Error importing ${filename}:`, error);
		throw error;
	}
};

// Main import function
async function importAllCSVs() {
	console.log('🌱 Starting CSV import process...');
	console.log('Note: Excluding users.csv as requested\n');

	// Clear all tables first to avoid foreign key constraints
	await clearAllTables();

	// Import order matters due to foreign key constraints
	// Note: Skipping sessions.csv due to foreign key constraint with users table
	const importOrder = [
		'tournaments.csv',
		'players.csv',
		'matches.csv',
		'playersOnMatches.csv',
		// 'sessions.csv', // Skipped - requires users table which we're not importing
	];

	try {
		for (const filename of importOrder) {
			await importTableData(filename);
			console.log(''); // Add spacing between tables
		}

		console.log('🎉 CSV import completed successfully!');
	} catch (error) {
		console.error('💥 Import failed:', error);
		process.exit(1);
	}
}

// Run the import
importAllCSVs()
	.catch((error) => {
		console.error('Fatal error:', error);
		process.exit(1);
	})
	.finally(() => {
		process.exit(0);
	});