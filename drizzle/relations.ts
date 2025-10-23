import { relations } from "drizzle-orm/relations";
import { tournament, match, playersOnMatches, player, user, account, session } from "./schema";

export const matchRelations = relations(match, ({one, many}) => ({
	tournament: one(tournament, {
		fields: [match.tournamentId],
		references: [tournament.id]
	}),
	playersOnMatches: many(playersOnMatches),
}));

export const tournamentRelations = relations(tournament, ({many}) => ({
	matches: many(match),
}));

export const playersOnMatchesRelations = relations(playersOnMatches, ({one}) => ({
	match: one(match, {
		fields: [playersOnMatches.matchId],
		references: [match.id]
	}),
	player: one(player, {
		fields: [playersOnMatches.playerId],
		references: [player.id]
	}),
}));

export const playerRelations = relations(player, ({many}) => ({
	playersOnMatches: many(playersOnMatches),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));