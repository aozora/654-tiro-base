import {
	getPlayerById,
	getPlayerStats,
	getTournament,
	type PlayerStats
} from '$lib/server/repository';
import type { Tournament } from '$lib/server/database/schema';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, playerId } = params;

	if (!tournamentId || !playerId) {
		return error(500, 'tournamentId or playerId missing');
	}

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const stats: PlayerStats = await getPlayerStats(tournamentId, playerId);

	if (!player) {
		return fail(400, 'Unable to load player');
	}

	console.log({
		player,
		tournament,
		stats
	});

	return {
		player,
		tournament,
		stats
	};
};
