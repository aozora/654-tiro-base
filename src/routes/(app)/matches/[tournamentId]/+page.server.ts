import type { Match, Tournament } from '#lib/server/database/schema.ts';
import { getMatches, getTournament } from '#lib/server/repository.ts';
import type { PageServerLoad } from './$types';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId } = params;
	const [matches, tournament]: [Array<Match>, Tournament] = await Promise.all([
		getMatches(tournamentId),
		getTournament(tournamentId),
	]);

	return {
		tournament,
		matches,
	};
};
