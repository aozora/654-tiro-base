import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

console.log(process.env.DATABASE_URL!, process.env.DATABASE_AUTH_TOKEN!);

export default defineConfig({
	schema: ['./app/lib/database/auth-schema.ts', './app/lib/database/schema.ts'],
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!,
	},
	verbose: true,
	strict: true,
});
