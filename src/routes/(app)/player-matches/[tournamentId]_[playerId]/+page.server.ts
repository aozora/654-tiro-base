import type { PageServerLoad } from './$types';
import {
	getPlayerById,
	getPlayers,
	getPlayerWithMatchesById,
	getTournament,
	type PlayerMatches
} from '$lib/server/repository';
import type { Tournament } from '@prisma/client';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, playerId } = params;

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const matches: Array<PlayerMatches> = await getPlayerWithMatchesById(tournamentId, playerId);

	return {
		player,
		tournament,
		matches
	};
};
