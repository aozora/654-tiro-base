import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users as luciaUsers, sessions as luciaSessions } from './schema.js';
import { betterAuthUser, betterAuthAccount, betterAuthSession } from './schema.js';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';
import * as schema from './schema.js';

config();

const client = postgres(process.env.VITE_DATABASE_URL!);
const db = drizzle(client, { schema });

/**
 * Migration script to migrate from Lucia auth to better-auth
 * This preserves all existing user and session data
 */

export async function migrateLuciaDataToBetterAuth() {
	console.log('🔄 Starting migration from Lucia to Better Auth...');

	try {
		// Step 1: Migrate users
		console.log('📝 Migrating users...');
		const existingUsers = await db.select().from(luciaUsers);

		for (const luciaUser of existingUsers) {
			// Check if user already exists in better-auth table
			const existingBetterAuthUser = await db
				.select()
				.from(betterAuthUser)
				.where(eq(betterAuthUser.id, luciaUser.id))
				.limit(1);

			if (existingBetterAuthUser.length === 0) {
				// Create user in better-auth format
				await db.insert(betterAuthUser).values({
					id: luciaUser.id,
					email: luciaUser.email,
					emailVerified: true, // Assume existing users have verified emails
					name: luciaUser.email.split('@')[0], // Use email prefix as name
					image: null,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				// Create account record for email/password authentication
				await db.insert(betterAuthAccount).values({
					id: `email_${luciaUser.id}`,
					accountId: luciaUser.email,
					providerId: 'credential',
					userId: luciaUser.id,
					password: luciaUser.password, // Migrate the hashed password
					accessToken: null,
					refreshToken: null,
					idToken: null,
					accessTokenExpiresAt: null,
					refreshTokenExpiresAt: null,
					scope: null,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				console.log(`✅ Migrated user: ${luciaUser.email}`);
			} else {
				console.log(`⏭️  User already exists: ${luciaUser.email}`);
			}
		}

		// Step 2: Migrate active sessions
		console.log('📝 Migrating active sessions...');
		const existingSessions = await db.select().from(luciaSessions);

		for (const luciaSession of existingSessions) {
			// Only migrate sessions that haven't expired
			if (luciaSession.expiresAt > new Date()) {
				// Check if session already exists in better-auth table
				const existingBetterAuthSession = await db
					.select()
					.from(betterAuthSession)
					.where(eq(betterAuthSession.id, luciaSession.id))
					.limit(1);

				if (existingBetterAuthSession.length === 0) {
					await db.insert(betterAuthSession).values({
						id: luciaSession.id,
						token: luciaSession.id, // Use session ID as token for compatibility
						userId: luciaSession.userId,
						expiresAt: luciaSession.expiresAt,
						createdAt: new Date(),
						updatedAt: new Date(),
						ipAddress: null,
						userAgent: null
					});

					console.log(`✅ Migrated session for user: ${luciaSession.userId}`);
				} else {
					console.log(`⏭️  Session already exists: ${luciaSession.id}`);
				}
			} else {
				console.log(`🗑️  Skipped expired session: ${luciaSession.id}`);
			}
		}

		console.log('✅ Migration completed successfully!');

		// Summary
		const userCount = await db.select().from(betterAuthUser);
		const sessionCount = await db.select().from(betterAuthSession);
		console.log(`📊 Migration summary:`);
		console.log(`   - Users migrated: ${userCount.length}`);
		console.log(`   - Active sessions migrated: ${sessionCount.length}`);
	} catch (error) {
		console.error('❌ Migration failed:', error);
		throw error;
	} finally {
		await client.end();
	}
}

/**
 * Rollback function to revert the migration if needed
 */
export async function rollbackMigration() {
	console.log('🔄 Rolling back better-auth migration...');

	try {
		// Delete all better-auth data (but keep Lucia data intact)
		await db.delete(betterAuthSession);
		await db.delete(betterAuthAccount);
		await db.delete(betterAuthUser);

		console.log('✅ Rollback completed - Lucia data preserved');
	} catch (error) {
		console.error('❌ Rollback failed:', error);
		throw error;
	}
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
	const command = process.argv[2];

	if (command === 'migrate') {
		migrateLuciaDataToBetterAuth()
			.then(() => process.exit(0))
			.catch(() => process.exit(1));
	} else if (command === 'rollback') {
		rollbackMigration()
			.then(() => process.exit(0))
			.catch(() => process.exit(1));
	} else {
		console.log('Usage: tsx migrate-lucia-to-better-auth.ts [migrate|rollback]');
		process.exit(1);
	}
}
