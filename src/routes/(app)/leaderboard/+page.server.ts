import type { PageServerLoad } from './$types';
import type { Player } from '@prisma/client';
import { getActiveTournament, getLeaderboard, getPlayers } from '$lib/server/repository';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournament = await getActiveTournament();
	const players: Array<Player> = await getPlayers();

	const leaderboard = await getLeaderboard(tournament.id);

	return {
		tournament,
		players,
		leaderboard
	};
};
