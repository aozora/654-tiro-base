/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PageServerLoad } from './$types';
import type { Player } from '@prisma/client';
import { getActiveTournament, getLeaderboard, getPlayers } from '$lib/server/repository';
import { error } from '@sveltejs/kit';
import type { PlayerLeaderboard } from '$types';

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

	// playerId
	// _sum.points
	const leaderboard: Array<PlayerLeaderboard> = leaderboardData.filter((x) => {
		const player = players.find((p) => p.id === x.playerId);

		// if (!player) {
		// 	error(500, 'Player not found');
		// }

		return {
			playerId: x.playerId,
			// @ts-ignore
			name: player.name,
			// @ts-ignore
			picture: player.picture || '',
			sumPoints: x._sum.points || 0
		} satisfies PlayerLeaderboard;
	});

	return {
		tournament,
		players,
		leaderboard
	};
};
