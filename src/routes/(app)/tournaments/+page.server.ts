import type { PageServerLoad } from './$types';
import { getTournaments } from '$lib/server/repository';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournaments = await getTournaments();

	return {
		tournaments
	};
};
