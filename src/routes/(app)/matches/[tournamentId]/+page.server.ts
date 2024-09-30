import type { PageServerLoad } from './$types';
import { getMatches } from '$lib/server/repository';
import type { Match } from '@prisma/client';

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId } = params;
	const matches: Array<Match> = await getMatches(tournamentId);


	return {
		matches
	};
};
