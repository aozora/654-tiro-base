import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
	url: import.meta.env.VITE_DATABASE_URL || '',
	authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});

// Queries name their tables explicitly, so the client needs no schema of its own
const db = drizzle({
	// logger: true,
	client,
});

export default db;
export type DrizzleDb = typeof db;
