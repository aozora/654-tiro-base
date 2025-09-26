import { pgTable, text, timestamp, boolean, integer, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('User', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	role: text('role').notNull()
});

// Sessions table
export const sessions = pgTable('Session', {
	id: text('id').primaryKey(),
	userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull()
});

// Players table
export const players = pgTable('Player', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	picture: text('picture'),
	isActive: boolean('isActive').default(true).notNull(),
	isDeleted: boolean('isDeleted').default(false).notNull()
});

// Tournaments table
export const tournaments = pgTable('Tournament', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	isActive: boolean('isActive').default(true).notNull()
});

// Matches table
export const matches = pgTable('Match', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
	tournamentId: text('tournamentId').notNull().references(() => tournaments.id)
});

// PlayersOnMatches junction table
export const playersOnMatches = pgTable('PlayersOnMatches', {
	playerId: text('playerId').notNull().references(() => players.id, { onUpdate: 'cascade' }),
	matchId: text('matchId').notNull().references(() => matches.id, { onUpdate: 'cascade' }),
	points: integer('points').notNull()
}, (table) => ({
	pk: primaryKey({ columns: [table.playerId, table.matchId] })
}));

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
