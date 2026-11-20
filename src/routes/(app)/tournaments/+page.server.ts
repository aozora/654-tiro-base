import { getTournaments } from '#lib/server/repository.ts';
import type { PageServerLoad } from './$types';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournaments = await getTournaments();

	return {
		// The page only shows how many matches were played, not the matches themselves
		tournaments: tournaments.map(({ matches, ...tournament }) => ({
			...tournament,
			matchesCount: matches.length,
		})),
	};
};
