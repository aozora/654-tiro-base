import type { PageServerLoad } from './$types';
import { getMatches, getTournament } from '$lib/server/db/repository';
import type { Match, Tournament } from '$lib/server/db';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId } = params;
	const matches: Array<Match> = await getMatches(tournamentId);
	const tournament: Tournament = await getTournament(tournamentId);

	return {
		tournament,
		matches
	};
};
