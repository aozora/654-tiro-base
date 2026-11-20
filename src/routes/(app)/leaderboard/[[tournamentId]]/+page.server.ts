import { error } from '@sveltejs/kit';
import type { Tournament } from '#lib/server/database/schema.ts';
import {
	getActiveTournament,
	getLeaderboard,
	getPlayers,
	getTournament,
} from '#lib/server/repository.ts';
import type { LeaderboardEntry } from '#types';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PageServerLoad } from './$types';

type UnrankedEntry = Omit<LeaderboardEntry, 'rank'>;

/**
 * Ranks a leaderboard by the given score, highest first.
 * Players with the same score share the same rank.
 */
function rankBy(
	leaderboard: Array<UnrankedEntry>,
	scoreOf: (entry: UnrankedEntry) => number,
): Array<LeaderboardEntry> {
	const sorted = leaderboard.toSorted((a, b) => scoreOf(b) - scoreOf(a));

	let rank = 0;
	let previousScore: number | undefined;

	return sorted.map((entry) => {
		const score = scoreOf(entry);
		if (score !== previousScore) {
			rank += 1;
			previousScore = score;
		}

		return { ...entry, rank };
	});
}

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	let tournament: Tournament;
	if (params.tournamentId) {
		tournament = await getTournament(String(params.tournamentId));
	} else {
		tournament = await getActiveTournament();
	}

	if (!tournament) {
		error(500, 'Active tournament not found!');
	}

	// Independent queries: run them in parallel
	const [players, leaderboardData] = await Promise.all([
		getPlayers(),
		getLeaderboard(tournament.id),
	]);
	const leaderboard: Array<UnrankedEntry> = leaderboardData.map((x) => {
		const player = players.find((p) => p.id === x.playerId);
		const sumTerritoriesPoints = x.totalTerritoriesPoints || 0;
		const matchesPlayed = x.matchesPlayed || 0;

		return {
			playerId: x.playerId,
			// @ts-ignore
			name: player.name,
			// @ts-ignore
			picture: player.picture || '',
			sumPoints: x.totalPoints || 0,
			sumTerritoriesPoints,
			matchesPlayed,
			averageTerritoriesPoints:
				matchesPlayed > 0 ? sumTerritoriesPoints / matchesPlayed : 0,
		};
	});

	return {
		tournament,
		leaderboardByMatchPoints: rankBy(leaderboard, (entry) => entry.sumPoints),
		leaderboardByTerritoriesPoints: rankBy(
			leaderboard,
			(entry) => entry.sumTerritoriesPoints,
		),
		leaderboardByAverage: rankBy(
			leaderboard,
			(entry) => entry.averageTerritoriesPoints,
		),
	};
};
