import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Better Auth schema tables
export const betterAuthUser = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull().default(false),
	name: text('name'),
	image: text('image'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const betterAuthSession = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId').notNull().references(() => betterAuthUser.id)
});

export const betterAuthAccount = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId').notNull().references(() => betterAuthUser.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const betterAuthVerification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt')
});

// Type definitions for better-auth
export type BetterAuthUser = typeof betterAuthUser.$inferSelect;
export type NewBetterAuthUser = typeof betterAuthUser.$inferInsert;

export type BetterAuthSession = typeof betterAuthSession.$inferSelect;
export type NewBetterAuthSession = typeof betterAuthSession.$inferInsert;

export type BetterAuthAccount = typeof betterAuthAccount.$inferSelect;
export type NewBetterAuthAccount = typeof betterAuthAccount.$inferInsert;
