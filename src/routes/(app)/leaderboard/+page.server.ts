import type { PageServerLoad } from './$types';
import type { Player } from '@prisma/client';
import { getActiveTournament, getPlayers } from '$lib/server/repository';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournament = await getActiveTournament();
	const players: Array<Player> = await getPlayers();

	return {
		tournament,
		players
	};
};
