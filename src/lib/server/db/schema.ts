import { pgTable, text, timestamp, boolean, integer, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Better Auth schema tables
export const betterAuthUser = pgTable('better_auth_user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull().default(false),
	name: text('name'),
	image: text('image'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const betterAuthSession = pgTable('better_auth_session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => betterAuthUser.id)
});

export const betterAuthAccount = pgTable('better_auth_account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => betterAuthUser.id),
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

export const betterAuthVerification = pgTable('better_auth_verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt')
});

// Users table
export const users = pgTable('User', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	role: text('role').notNull()
});

// Sessions table
export const sessions = pgTable('Session', {
	id: text('id').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull()
});

// Players table
export const players = pgTable('Player', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	picture: text('picture'),
	isActive: boolean('isActive').default(true).notNull(),
	isDeleted: boolean('isDeleted').default(false).notNull()
});

// Tournaments table
export const tournaments = pgTable('Tournament', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	isActive: boolean('isActive').default(true).notNull()
});

// Matches table
export const matches = pgTable('Match', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
	tournamentId: text('tournamentId')
		.notNull()
		.references(() => tournaments.id)
});

// PlayersOnMatches junction table
export const playersOnMatches = pgTable(
	'PlayersOnMatches',
	{
		playerId: text('playerId')
			.notNull()
			.references(() => players.id, { onUpdate: 'cascade' }),
		matchId: text('matchId')
			.notNull()
			.references(() => matches.id, { onUpdate: 'cascade' }),
		points: integer('points').notNull()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.playerId, table.matchId] })
	})
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const playersRelations = relations(players, ({ many }) => ({
	matches: many(playersOnMatches)
}));

export const tournamentsRelations = relations(tournaments, ({ many }) => ({
	matches: many(matches)
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
	tournament: one(tournaments, {
		fields: [matches.tournamentId],
		references: [tournaments.id]
	}),
	players: many(playersOnMatches)
}));

export const playersOnMatchesRelations = relations(playersOnMatches, ({ one }) => ({
	player: one(players, {
		fields: [playersOnMatches.playerId],
		references: [players.id]
	}),
	match: one(matches, {
		fields: [playersOnMatches.matchId],
		references: [matches.id]
	})
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;

export type Tournament = typeof tournaments.$inferSelect;
export type NewTournament = typeof tournaments.$inferInsert;

export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;

export type PlayerOnMatch = typeof playersOnMatches.$inferSelect;
export type NewPlayerOnMatch = typeof playersOnMatches.$inferInsert;
