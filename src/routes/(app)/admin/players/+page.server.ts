import type { Actions, PageServerLoad } from './$types';
import { getPlayers, upsertPlayer } from '$lib/server/repository';
import type { Player } from '@prisma/client';
import { message, superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

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

/**
 * Page Action
 */
export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			return fail(400, { form });
		}

		console.log('Mao');

		try {
			console.log('DEBUG form.data: ', form.data);

			await upsertPlayer(
				form.data.id === 'undefined' ? '' : String(form.data.id),
				form.data.name,
				form.data.isActive
			);

			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, {
				message: 'An unknown error occurred.',
				form
			});
		}
	}
};
