import type { PageServerLoad } from './$types';
import {
	getPlayerById,
	getPlayerStats,
	getTournament,
	type PlayerStats
} from '$lib/server/db/repository';
import type { Tournament } from '$lib/server/db';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, playerId } = params;

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const stats: PlayerStats = await getPlayerStats(tournamentId, playerId);
	// console.log({ stats });

	return {
		player,
		tournament,
		stats
	};
};
