import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';

// Players table
export const players = sqliteTable('Player', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	picture: text('picture'),
	isActive: integer({ mode: 'boolean' }).default(true).notNull(),
	isDeleted: integer({ mode: 'boolean' }).default(false).notNull(),
});

// Tournaments table
export const tournaments = sqliteTable('Tournament', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	isActive: integer({ mode: 'boolean' }).default(true).notNull(),
});

// Matches table
export const matches = sqliteTable('Match', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	date: integer({ mode: 'timestamp' }).notNull(),
	tournamentId: text('tournamentId')
		.notNull()
		.references(() => tournaments.id),
});

// PlayersOnMatches junction table
export const playersOnMatches = sqliteTable(
	'PlayersOnMatches',
	{
		playerId: text('playerId')
			.notNull()
			.references(() => players.id, { onUpdate: 'cascade' }),
		matchId: text('matchId')
			.notNull()
			.references(() => matches.id, { onUpdate: 'cascade' }),
		points: integer('points').notNull(),
		territoriesPoints: integer('territoriesPoints').default(0).notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.playerId, table.matchId] }),
	}),
);

// Types
export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;

export type Tournament = typeof tournaments.$inferSelect;
export type NewTournament = typeof tournaments.$inferInsert;

export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;

export type PlayerOnMatch = typeof playersOnMatches.$inferSelect;
export type NewPlayerOnMatch = typeof playersOnMatches.$inferInsert;
