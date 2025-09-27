import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
	db,
	betterAuthUser,
	betterAuthSession,
	betterAuthAccount,
	betterAuthVerification
} from './db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user: betterAuthUser,
			session: betterAuthSession,
			account: betterAuthAccount,
			verification: betterAuthVerification
		}
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7 // 7 days
	},
	secret: process.env.BETTER_AUTH_SECRET!,
	baseURL: process.env.BETTER_AUTH_URL!
});
