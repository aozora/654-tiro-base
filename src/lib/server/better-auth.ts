import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'cockroachdb'
	}),

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		minPasswordLength: 8,
		maxPasswordLength: 128
	},

	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5 // 5 minutes
		}
	},

	advanced: {
		cookiePrefix: 'better-auth',
		crossSubDomainCookies: {
			enabled: false
		},
		generateId: () => {
			return crypto.randomUUID();
		}
	},

	// Configure user fields to match your app needs
	user: {
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: 'user',
				required: false
			}
		}
	}
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
