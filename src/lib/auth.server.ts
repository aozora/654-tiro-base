import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins';
import * as schemaAuth from './server/database/auth-schema';
import * as schemaApp from './server/database/schema';
import db from './server/db';
import { getRequestEvent } from '$app/server';
import { BETTER_AUTH_SECRET } from '$app/env/private';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			...schemaApp,
			user: schemaAuth.user,
			account: schemaAuth.account,
			verification: schemaAuth.verification,
			session: schemaAuth.session
		}
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	],
	trustedOrigins: ['http://localhost:5173', 'https://654-tiro-base.netlify.app'],
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // Cache duration in seconds
		}
	},
	logger: {
		level: 'debug',
		disabled: process.env.NODE_ENV !== 'development'
	}
});

/**
 * Get the logged-in user (server side)
 * @param request
 */
export const isUserAuthenticated = async (request: Request) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	return session?.user;
};
