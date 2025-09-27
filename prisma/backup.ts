import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface BackupOptions {
	format?: 'csv' | 'json' | 'both';
	outputDir?: string;
	includeRelations?: boolean;
	compress?: boolean;
}

// Utility function to convert data to CSV format
function convertToCSV(data: any[], headers: string[]): string {
	if (data.length === 0) {
		return headers.join(',');
	}

	const csvHeaders = headers.join(',');

	const csvRows = data.map(row => {
		return headers.map(header => {
			const value = row[header];

			// Handle null/undefined values
			if (value === null || value === undefined) {
				return '';
			}

			// Handle dates
			if (value instanceof Date) {
				return `"${value.toISOString()}"`;
			}

			// Handle strings (escape quotes and wrap in quotes if contains comma, quote, or newline)
			if (typeof value === 'string') {
				const escapedValue = value.replace(/"/g, '""');
				if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
					return `"${escapedValue}"`;
				}
				return escapedValue;
			}

			// Handle booleans
			if (typeof value === 'boolean') {
				return value ? 'true' : 'false';
			}

			// Handle other types
			return String(value);
		}).join(',');
	});

	return [csvHeaders, ...csvRows].join('\n');
}

// Function to ensure backup directory exists
function ensureBackupDirectory(backupDir: string): void {
	if (!fs.existsSync(backupDir)) {
		fs.mkdirSync(backupDir, { recursive: true });
		console.log(`Created backup directory: ${backupDir}`);
	}
}

// Function to write files
function writeFile(filePath: string, content: string, tableName: string, recordCount: number, format: string): void {
	fs.writeFileSync(filePath, content, 'utf8');
	console.log(`✅ Exported ${recordCount} records from ${tableName} to ${path.basename(filePath)} (${format.toUpperCase()})`);
}

// Function to get table data with optional relations
async function getTableData() {
	const tables = {
		users: await prisma.user.findMany({
			orderBy: { id: 'asc' }
		}),
		sessions: await prisma.session.findMany({
			orderBy: { id: 'asc' }
		}),
		players: await prisma.player.findMany({
			orderBy: { id: 'asc' }
		}),
		tournaments: await prisma.tournament.findMany({
			orderBy: { id: 'asc' }
		}),
		matches: await prisma.match.findMany({
			orderBy: { id: 'asc' }
		}),
		playersOnMatches: await prisma.playersOnMatches.findMany({
			orderBy: [{ playerId: 'asc' }, { matchId: 'asc' }]
		})
	};

	return tables;
}

// Function to get table data with relations (for JSON export)
async function getTableDataWithRelations() {
	const tables = {
		users: await prisma.user.findMany({
			include: {
				sessions: true
			},
			orderBy: { id: 'asc' }
		}),
		sessions: await prisma.session.findMany({
			include: {
				user: {
					select: { id: true, email: true, role: true } // Don't include password
				}
			},
			orderBy: { id: 'asc' }
		}),
		players: await prisma.player.findMany({
			include: {
				matches: {
					include: {
						match: {
							include: {
								tournament: true
							}
						}
					}
				}
			},
			orderBy: { id: 'asc' }
		}),
		tournaments: await prisma.tournament.findMany({
			include: {
				matches: {
					include: {
						players: {
							include: {
								player: true
							}
						}
					}
				}
			},
			orderBy: { id: 'asc' }
		}),
		matches: await prisma.match.findMany({
			include: {
				tournament: true,
				players: {
					include: {
						player: true
					}
				}
			},
			orderBy: { id: 'asc' }
		}),
		playersOnMatches: await prisma.playersOnMatches.findMany({
			include: {
				player: true,
				match: {
					include: {
						tournament: true
					}
				}
			},
			orderBy: [{ playerId: 'asc' }, { matchId: 'asc' }]
		})
	};

	return tables;
}

async function backupDatabase(options: BackupOptions = {}) {
	const {
		format = 'csv',
		outputDir = 'backups',
		includeRelations = false
	} = options;

	try {
		console.log('🚀 Starting database backup...\n');
		console.log(`Format: ${format.toUpperCase()}`);
		console.log(`Include relations: ${includeRelations ? 'Yes' : 'No'}\n`);

		// Create timestamp for backup folder
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
		const backupDir = path.join(process.cwd(), outputDir, `backup_${timestamp}`);

		ensureBackupDirectory(backupDir);

		// Get table data
		const tables = includeRelations ? await getTableDataWithRelations() : await getTableData();

		// Define table schemas for CSV export
		const tableSchemas = {
			users: ['id', 'email', 'password', 'role'],
			sessions: ['id', 'expiresAt', 'userId'],
			players: ['id', 'name', 'picture', 'isActive', 'isDeleted'],
			tournaments: ['id', 'title', 'isActive'],
			matches: ['id', 'date', 'tournamentId'],
			playersOnMatches: ['playerId', 'matchId', 'points']
		};

		const backupSummary = {
			backupDate: new Date().toISOString(),
			backupDirectory: backupDir,
			format,
			includeRelations,
			tables: {} as Record<string, number>,
			totalRecords: 0
		};

		// Process each table
		for (const [tableName, data] of Object.entries(tables)) {
			console.log(`📊 Backing up ${tableName} table...`);

			const recordCount = data.length;
			backupSummary.tables[tableName] = recordCount;
			backupSummary.totalRecords += recordCount;

			if (format === 'csv' || format === 'both') {
				const schema = tableSchemas[tableName as keyof typeof tableSchemas];
				const csvContent = convertToCSV(data, schema);
				const csvPath = path.join(backupDir, `${tableName}.csv`);
				writeFile(csvPath, csvContent, tableName, recordCount, 'csv');
			}

			if (format === 'json' || format === 'both') {
				const jsonContent = JSON.stringify(data, null, 2);
				const jsonPath = path.join(backupDir, `${tableName}.json`);
				writeFile(jsonPath, jsonContent, tableName, recordCount, 'json');
			}
		}

		// Create backup summary
		fs.writeFileSync(
			path.join(backupDir, 'backup_summary.json'),
			JSON.stringify(backupSummary, null, 2),
			'utf8'
		);

		// Create README for the backup
		const readmeContent = `# Database Backup

**Backup Date:** ${backupSummary.backupDate}
**Format:** ${format.toUpperCase()}
**Include Relations:** ${includeRelations ? 'Yes' : 'No'}

## Tables Backed Up

${Object.entries(backupSummary.tables)
			.map(([table, count]) => `- **${table}:** ${count} records`)
			.join('\n')}

**Total Records:** ${backupSummary.totalRecords}

## File Descriptions

${Object.keys(tables).map(tableName => {
			const descriptions = [];
			if (format === 'csv' || format === 'both') {
				descriptions.push(`- \`${tableName}.csv\`: CSV export of ${tableName} table`);
			}
			if (format === 'json' || format === 'both') {
				descriptions.push(`- \`${tableName}.json\`: JSON export of ${tableName} table${includeRelations ? ' (with relations)' : ''}`);
			}
			return descriptions.join('\n');
		}).join('\n')}

- \`backup_summary.json\`: Backup metadata and summary
- \`README.md\`: This file
`;

		fs.writeFileSync(path.join(backupDir, 'README.md'), readmeContent, 'utf8');

		console.log('\n✅ Database backup completed successfully!');
		console.log(`📁 Backup location: ${backupDir}`);
		console.log(`📈 Total records backed up: ${backupSummary.totalRecords}`);
		console.log('\nBackup summary:');
		Object.entries(backupSummary.tables).forEach(([table, count]) => {
			console.log(`   ${table}: ${count} records`);
		});

		return backupDir;

	} catch (error) {
		console.error('❌ Error during backup:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: BackupOptions = {};

args.forEach((arg, index) => {
	switch (arg) {
		case '--format':
			const formatValue = args[index + 1];
			if (['csv', 'json', 'both'].includes(formatValue)) {
				options.format = formatValue as 'csv' | 'json' | 'both';
			}
			break;
		case '--with-relations':
			options.includeRelations = true;
			break;
		case '--output-dir':
			options.outputDir = args[index + 1];
			break;
	}
});

// Run the backup
backupDatabase(options).catch((error) => {
	console.error('❌ Unexpected error:', error);
	process.exit(1);
});
