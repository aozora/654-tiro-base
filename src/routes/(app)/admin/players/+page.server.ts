import type { PageServerLoad } from './$types';
import { getPlayers } from '$lib/server/repository';
import type { Player } from '@prisma/client';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	// const form = await superValidate(schema);

	return {
		players
	};
};
