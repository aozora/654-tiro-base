import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins';
import * as schemaAuth from './server/database/auth-schema';
import * as schemaApp from './server/database/schema';
import db from './server/db';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite', // or "pg" or "mysql"
		schema: {
			...schemaApp,
			user: schemaAuth.user,
			account: schemaAuth.account,
			verification: schemaAuth.verification,
			session: schemaAuth.session
		}
	}),
	emailAndPassword: {
		enabled: true,
		sendEmailVerificationOnSignUp: false,
		asResponse: true
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent)// make sure this is the last plugin in the array
	],
	//if all of them are just using plural form, you can just pass the option below
	usePlural: false,
	trustedOrigins: ['http://localhost:5173', 'https://654-tiro-base.netlify.app'],
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // Cache duration in seconds
		}
	},
	debug: process.env.NODE_ENV === 'development'
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
