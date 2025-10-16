import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config();

export default defineConfig({
	schema: ['./src/lib/server/database/schema.ts', './src/lib/server/database/auth-schema.ts'],
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.VITE_DATABASE_URL!,
		authToken: process.env.VITE_DATABASE_AUTH_TOKEN!,
	},
	verbose: true,
	strict: true
});
