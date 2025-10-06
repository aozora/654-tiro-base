import {
	getPlayerById,
	getPlayerStats,
	getTournament,
	type PlayerStats
} from '$lib/server/repository';
import type { PageServerLoad } from './$types';
import type { Tournament } from '$lib/server/database/schema';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, playerId } = params;

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const stats: PlayerStats = await getPlayerStats(tournamentId, playerId);

	return {
		player,
		tournament,
		stats
	};
};
