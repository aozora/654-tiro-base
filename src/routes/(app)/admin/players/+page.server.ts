import type { PageServerLoad } from './$types';
import { getPlayers } from '$lib/server/repository';
import type { Player } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

const schemaTemp = z.object({
	id: z.string().nullable().optional(),
	name: z.string().min(2),
	picture: z.string().nullable().optional(),
	isActive: z.boolean()
});
const schema = schemaTemp.required({
	// id is false to allow new items
	name: true,
	// picture: true,
	isActive: true
});

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	const form = await superValidate(zod(schema));

	return {
		players,
		form
	};
};
