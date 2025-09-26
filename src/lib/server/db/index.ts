import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { VITE_DATABASE_URL } from '$env/static/private';
import * as schema from './schema.js';

const client = postgres(VITE_DATABASE_URL);
export const db = drizzle(client, { schema });

export * from './schema.js';
