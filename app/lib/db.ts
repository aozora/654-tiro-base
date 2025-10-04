import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schemaAuth from './database/auth-schema';
import * as schemaApp from './database/schema';

const client = createClient({
	url: import.meta.env.VITE_DATABASE_URL || '',
	authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});

const db = drizzle({
	client,
	schema: {
		...schemaApp,
		...schemaAuth,
	},
});

export default db;
export type DrizzleDb = typeof db;
