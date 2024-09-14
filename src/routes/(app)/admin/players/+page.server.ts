import type { PageServerLoad } from './$types';
import { getPlayers } from '$lib/server/repository';
import type { Player } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schemaTemp = z.object({
	id: z.string().nullable().optional(),
	name: z.string().min(2),
	picture: z.string(),
	isActive: z.boolean()
});
const schema = schemaTemp.required({
	// id is false to allow new items
	name: true,
	// picture: false,
	isActive: true
});

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	const form = await superValidate(schema);

	return {
		players,
		form
	};
};
