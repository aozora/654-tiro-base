import { error } from '@sveltejs/kit';
import {
	getPlayerById,
	getPlayerStats,
	getTournament,
} from '#lib/server/repository.ts';
import type { PageServerLoad } from './$types';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, playerId } = params;

	if (!tournamentId || !playerId) {
		return error(500, 'tournamentId or playerId missing');
	}

	const [player, tournament, stats] = await Promise.all([
		getPlayerById(playerId),
		getTournament(tournamentId),
		getPlayerStats(tournamentId, playerId),
	]);

	if (!player) {
		return error(400, 'Unable to load player');
	}

	return {
		player,
		tournament,
		stats,
	};
};
