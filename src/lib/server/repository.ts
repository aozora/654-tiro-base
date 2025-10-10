import { and, asc, desc, eq, inArray, sql, sum } from 'drizzle-orm';
import {
	type Match,
	matches,
	type Player,
	type PlayerOnMatch,
	players,
	playersOnMatches,
	type Tournament,
	tournaments,
} from './database/schema';
import db from './db';

// Players
export async function getPlayers(): Promise<Array<Player>> {
	return db
		.select()
		.from(players)
		.where(eq(players.isDeleted, false))
		.orderBy(asc(players.name));
}

export async function getPlayerById(id: string): Promise<Player> {
	const result = await db
		.select()
		.from(players)
		.where(eq(players.id, id))
		.limit(1);

	if (result.length === 0) {
		throw new Error(`Player with id ${id} not found`);
	}

	return result[0];
}

export type PlayerMatches = {
	playerId: string;
	matchId: string;
	points: number;
	date: Date;
};

export type PlayerStats = {
	matchesDatesAndPoints: Array<PlayerMatches>;
	matchesPlayedCount: number;
	matchesWonCount: number;
};

export async function getPlayerStats(
	tournamentId: string,
	playerId: string,
): Promise<PlayerStats> {
	// Get tournament matches for the player
	const tournamentMatches = await db
		.select({
			playerId: playersOnMatches.playerId,
			matchId: playersOnMatches.matchId,
			points: playersOnMatches.points,
			date: matches.date,
		})
		.from(playersOnMatches)
		.innerJoin(matches, eq(playersOnMatches.matchId, matches.id))
		.where(
			and(
				eq(matches.tournamentId, tournamentId),
				eq(playersOnMatches.playerId, playerId),
			),
		)
		.orderBy(asc(matches.date));

	// Get distinct match IDs where player participated
	const distinctMatchIds = await db
		.selectDistinct({
			matchId: playersOnMatches.matchId,
		})
		.from(playersOnMatches)
		.innerJoin(matches, eq(playersOnMatches.matchId, matches.id))
		.where(
			and(
				eq(playersOnMatches.playerId, playerId),
				eq(matches.tournamentId, tournamentId),
			),
		);

	const matchesPlayedCount = distinctMatchIds.length;
	let matchesWonCount = 0;

	if (distinctMatchIds.length > 0) {
		// Get all players' results for these matches
		const allMatchResults = await db
			.select()
			.from(playersOnMatches)
			.innerJoin(matches, eq(playersOnMatches.matchId, matches.id))
			.where(
				and(
					inArray(
						playersOnMatches.matchId,
						distinctMatchIds.map((m) => m.matchId),
					),
					eq(matches.tournamentId, tournamentId),
				),
			);

		// Calculate wins
		for (const distinctMatch of distinctMatchIds) {
			const matchResults = allMatchResults.filter(
				(x) => x.PlayersOnMatches.matchId === distinctMatch.matchId,
			);
			const maxPoints = Math.max(
				...matchResults.map((x) => x.PlayersOnMatches.points),
			);
			const winner = matchResults.find(
				(x) => x.PlayersOnMatches.points === maxPoints,
			);

			if (winner && winner.PlayersOnMatches.playerId === playerId) {
				matchesWonCount += 1;
			}
		}
	}

	const matchesDatesAndPoints: Array<PlayerMatches> = tournamentMatches.map(
		(m) => ({
			playerId: m.playerId,
			matchId: m.matchId,
			date: m.date,
			points: m.points,
		}),
	);

	return {
		matchesDatesAndPoints,
		matchesPlayedCount,
		matchesWonCount,
	};
}

export async function upsertPlayer(
	id: undefined | string,
	name: string,
	picture: string,
	isActive: boolean,
): Promise<Player> {
	if (id) {
		// Update existing player
		const result = await db
			.update(players)
			.set({ name, isActive, picture })
			.where(eq(players.id, id))
			.returning();

		if (result.length === 0) {
			throw new Error(`Player with id ${id} not found`);
		}

		return result[0];
	} else {
		// Create new player
		const result = await db
			.insert(players)
			.values({ name, isActive, picture })
			.returning();

		return result[0];
	}
}

export async function updatePlayerPicture(
	id: string,
	picture: string,
): Promise<Player> {
	const result = await db
		.update(players)
		.set({ picture })
		.where(eq(players.id, id))
		.returning();

	if (result.length === 0) {
		throw new Error(`Player with id ${id} not found`);
	}

	return result[0];
}

export async function deletePlayer(id: string): Promise<void> {
	await db
		.update(players)
		.set({ isDeleted: true, isActive: false })
		.where(eq(players.id, id));
}

// Tournaments
export async function getTournaments(): Promise<
	Array<Tournament & { matches: Match[] }>
> {
	const tournamentsData = await db
		.select()
		.from(tournaments)
		.orderBy(desc(tournaments.title));

	// Get matches for each tournament
	const result = [];
	for (const tournament of tournamentsData) {
		const tournamentMatches = await db
			.select()
			.from(matches)
			.where(eq(matches.tournamentId, tournament.id));

		result.push({
			...tournament,
			matches: tournamentMatches,
		});
	}

	return result;
}

export async function getTournament(id: string): Promise<Tournament> {
	const result = await db
		.select()
		.from(tournaments)
		.where(eq(tournaments.id, id))
		.limit(1);

	if (result.length === 0) {
		throw new Error(`Tournament with id ${id} not found`);
	}

	return result[0];
}

export async function getActiveTournament(): Promise<Tournament> {
	const result = await db
		.select()
		.from(tournaments)
		.where(eq(tournaments.isActive, true))
		.limit(1);

	if (result.length === 0) {
		throw new Error('No active tournament found');
	}

	return result[0];
}

export async function upsertTournament(
	id: undefined | string,
	title: string,
	isActive: boolean,
): Promise<Tournament> {
	if (id) {
		// Update existing tournament
		const result = await db
			.update(tournaments)
			.set({ title, isActive })
			.where(eq(tournaments.id, id))
			.returning();

		if (result.length === 0) {
			throw new Error(`Tournament with id ${id} not found`);
		}

		return result[0];
	} else {
		// Create new tournament
		const result = await db
			.insert(tournaments)
			.values({ title, isActive })
			.returning();

		return result[0];
	}
}

// Matches
export async function getMatches(tournamentId: string): Promise<Array<Match>> {
	return db
		.select()
		.from(matches)
		.where(eq(matches.tournamentId, tournamentId))
		.orderBy(desc(matches.date));
}

export async function getMatch(id: string): Promise<Match> {
	const result = await db
		.select()
		.from(matches)
		.where(eq(matches.id, id))
		.limit(1);

	if (result.length === 0) {
		throw new Error(`Match with id ${id} not found`);
	}

	return result[0];
}

export async function upsertMatch(
	id: undefined | string,
	tournamentId: string,
	date: Date,
): Promise<Match> {
	console.log({ id, tournamentId, date });

	if (id) {
		// Update existing match
		const result = await db
			.update(matches)
			.set({ date })
			.where(eq(matches.id, id))
			.returning();

		if (result.length === 0) {
			throw new Error(`Match with id ${id} not found`);
		}

		return result[0];
	} else {
		// Create new match
		const result = await db
			.insert(matches)
			.values({ date, tournamentId })
			.returning();

		return result[0];
	}
}

export async function deleteMatchDeep(id: string): Promise<Match> {
	// Delete all player-match relationships first
	await db.delete(playersOnMatches).where(eq(playersOnMatches.matchId, id));

	// Delete the match
	const result = await db.delete(matches).where(eq(matches.id, id)).returning();

	if (result.length === 0) {
		throw new Error(`Match with id ${id} not found`);
	}

	return result[0];
}

export type PlayerExtended = Player & { points: number };

export async function getMatchPlayers(
	matchId: string,
): Promise<Array<PlayerExtended>> {
	const result = await db
		.select({
			id: players.id,
			name: players.name,
			picture: players.picture,
			isActive: players.isActive,
			isDeleted: players.isDeleted,
			points: playersOnMatches.points,
		})
		.from(playersOnMatches)
		.innerJoin(players, eq(playersOnMatches.playerId, players.id))
		.where(eq(playersOnMatches.matchId, matchId))
		.orderBy(desc(playersOnMatches.points));

	return result;
}

export async function upsertMatchPlayer(
	matchId: string,
	playerId: string,
	points: number,
): Promise<PlayerOnMatch> {
	// Try to update first
	const updateResult = await db
		.update(playersOnMatches)
		.set({ points })
		.where(
			and(
				eq(playersOnMatches.playerId, playerId),
				eq(playersOnMatches.matchId, matchId),
			),
		)
		.returning();

	if (updateResult.length > 0) {
		return updateResult[0];
	}

	// If no update occurred, insert new record
	const insertResult = await db
		.insert(playersOnMatches)
		.values({ matchId, playerId, points })
		.returning();

	return insertResult[0];
}

export async function removePlayerFromMatch(
	matchId: string,
	playerId: string,
): Promise<PlayerOnMatch> {
	const result = await db
		.delete(playersOnMatches)
		.where(
			and(
				eq(playersOnMatches.playerId, playerId),
				eq(playersOnMatches.matchId, matchId),
			),
		)
		.returning();

	if (result.length === 0) {
		throw new Error(`Player-match relationship not found`);
	}

	return result[0];
}

export async function getLeaderboard(tournamentId: string) {
	// Get all match IDs for the tournament
	const tournamentMatches = await db
		.select() // { id: matches.id }
		.from(matches)
		.where(eq(matches.tournamentId, tournamentId));

	const matchesIds = tournamentMatches.map(
		(tournamentMatche) => tournamentMatche.id,
	);

	if (tournamentMatches.length === 0) {
		return [];
	}

	// Group by playerId and sum points
	return db
		.select({
			playerId: playersOnMatches.playerId,
			// totalPoints: sum(playersOnMatches.points),
			totalPoints: sql<number>`sum(${playersOnMatches.points})`,
		})
		.from(playersOnMatches)
		.where(inArray(playersOnMatches.matchId, matchesIds))
		.groupBy(playersOnMatches.playerId);
}
