import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from './db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite', // or "pg" or "mysql"
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
