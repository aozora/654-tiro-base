/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PageServerLoad } from './$types';
import {
	getActiveTournament,
	getLeaderboard,
	getPlayers,
	getTournament
} from '$lib/server/repository';
import { error } from '@sveltejs/kit';
import type { PlayerLeaderboard, PlayerLeaderboardWithNormalizedRanking } from '$types';
import { sortPointsDesc } from '$lib/helpers';
import type { Player, Tournament } from '$lib/server/database/schema';

function normalizeLeaderboardRanking(
	sortedLeaderboard: Array<PlayerLeaderboard>
): Array<PlayerLeaderboardWithNormalizedRanking> {
	const list: Array<PlayerLeaderboardWithNormalizedRanking> = [];
	let previousRank = 0;
	let previousPoints = 0;

	for (let index = 0; index < sortedLeaderboard.length; index++) {
		const current = sortedLeaderboard[index];
		let currentRank = 0;
		if (current.sumPoints === previousPoints) {
			currentRank = previousRank;
		} else {
			currentRank = previousRank + 1;
			previousRank += 1;
		}

		// console.log(current.sumPoints, previousPoints, previousRank, currentRank);
		list.push({
			...current,
			rank: currentRank
		} as PlayerLeaderboardWithNormalizedRanking);

		previousPoints = current.sumPoints;
	}

	return list;
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

	const players: Array<Player> = await getPlayers();

	if (!tournament) {
		error(500, 'Active tournament not found!');
	}

	const leaderboardData = await getLeaderboard(tournament.id);
	const leaderboard: Array<PlayerLeaderboard> = leaderboardData
		.map((x) => {
			const player = players.find((p) => p.id === x.playerId);

			return {
				playerId: x.playerId,
				// @ts-ignore
				name: player.name,
				// @ts-ignore
				picture: player.picture || '',
				sumPoints: x.totalPoints || 0,
			} satisfies PlayerLeaderboard;
		})
		.sort(sortPointsDesc);

	return {
		tournament,
		leaderboard: normalizeLeaderboardRanking(leaderboard)
	};
};
