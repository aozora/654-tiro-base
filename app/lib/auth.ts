import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schemaAuth from './database/auth-schema';
import * as schemaApp from './database/schema';
import db from './db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite', // or "pg" or "mysql"
		schema: {
			...schemaApp,
			user: schemaAuth.user,
			account: schemaAuth.account,
			verification: schemaAuth.verification,
			session: schemaAuth.session,
		},
	}),
	emailAndPassword: {
		enabled: true,
		sendEmailVerificationOnSignUp: false,
		asResponse: true,
	},
	//if all of them are just using plural form, you can just pass the option below
	usePlural: false,
	trustedOrigins: ['http://localhost:5173'],
	debug: process.env.NODE_ENV === 'development',
});

export const isUserAuthenticated = async (request: Request) => {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	return session?.user;
};
