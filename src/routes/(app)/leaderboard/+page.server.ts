/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PageServerLoad } from './$types';
import type { Player } from '@prisma/client';
import { getActiveTournament, getLeaderboard, getPlayers } from '$lib/server/repository';
import { error } from '@sveltejs/kit';
import type { PlayerLeaderboard } from '$types';

function sortPointsDesc(a: PlayerLeaderboard, b: PlayerLeaderboard) {
	if (a.sumPoints > b.sumPoints) {
		return -1;
	} else if (a.sumPoints < b.sumPoints) {
		return 1;
	}

	// a must be equal to b
	return 0;
}

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournament = await getActiveTournament();
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
				sumPoints: x._sum.points || 0
			} satisfies PlayerLeaderboard;
		})
		.sort(sortPointsDesc);

	return {
		tournament,
		leaderboard
	};
};
