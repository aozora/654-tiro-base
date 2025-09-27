import postgres from 'postgres';
import { config } from 'dotenv';

config();

const sql = postgres(process.env.VITE_DATABASE_URL!);

async function createBetterAuthTables() {
	console.log('🔄 Creating better-auth tables...');

	try {
		await sql`
			CREATE TABLE IF NOT EXISTS "better_auth_user" (
				"id" text PRIMARY KEY NOT NULL,
				"email" text NOT NULL UNIQUE,
				"emailVerified" boolean DEFAULT false NOT NULL,
				"name" text,
				"image" text,
				"createdAt" timestamp NOT NULL,
				"updatedAt" timestamp NOT NULL
			);
		`;

		await sql`
			CREATE TABLE IF NOT EXISTS "better_auth_session" (
				"id" text PRIMARY KEY NOT NULL,
				"expiresAt" timestamp NOT NULL,
				"token" text NOT NULL UNIQUE,
				"createdAt" timestamp NOT NULL,
				"updatedAt" timestamp NOT NULL,
				"ipAddress" text,
				"userAgent" text,
				"userId" text NOT NULL REFERENCES "better_auth_user"("id")
			);
		`;

		await sql`
			CREATE TABLE IF NOT EXISTS "better_auth_account" (
				"id" text PRIMARY KEY NOT NULL,
				"accountId" text NOT NULL,
				"providerId" text NOT NULL,
				"userId" text NOT NULL REFERENCES "better_auth_user"("id"),
				"accessToken" text,
				"refreshToken" text,
				"idToken" text,
				"accessTokenExpiresAt" timestamp,
				"refreshTokenExpiresAt" timestamp,
				"scope" text,
				"password" text,
				"createdAt" timestamp NOT NULL,
				"updatedAt" timestamp NOT NULL
			);
		`;

		await sql`
			CREATE TABLE IF NOT EXISTS "better_auth_verification" (
				"id" text PRIMARY KEY NOT NULL,
				"identifier" text NOT NULL,
				"value" text NOT NULL,
				"expiresAt" timestamp NOT NULL,
				"createdAt" timestamp,
				"updatedAt" timestamp
			);
		`;

		console.log('✅ Better-auth tables created successfully!');

	} catch (error) {
		console.error('❌ Error creating tables:', error);
		throw error;
	} finally {
		await sql.end();
	}
}

createBetterAuthTables()
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
