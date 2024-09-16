import type { Actions, PageServerLoad } from './$types';
import { deletePlayer, getPlayers, upsertPlayer } from '$lib/server/repository';
import type { Player } from '@prisma/client';
import { message, superValidate, fail, withFiles } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

const schemaUpdateTemp = z.object({
	id: z.string().nullable().optional(),
	name: z.string().min(2),
	picture: z.string().nullable().optional(),
	action: z.string().nullable().optional(),
	isActive: z.boolean()
});
const schemaUpdate = schemaUpdateTemp.required({
	// id is false to allow new items
	name: true,
	// picture: true,
	isActive: true
});

const schemaDelete = z
	.object({
		id: z.string()
	})
	.required();

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	const form = await superValidate(zod(schemaUpdate));

	return {
		players,
		form
	};
};

/**
 * Page Action
 */
export const actions: Actions = {
	update: async ({ request }) => {
		const form = await superValidate(request, zod(schemaUpdate));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Form not valid', form);
			return fail(400, { form });
		}

		try {
			await upsertPlayer(
				form.data.id === 'undefined' ? '' : String(form.data.id),
				form.data.name,
				form.data.isActive
			);

			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500);
		}
	},

	/**
	 * NOTE: delete don't work cause of FK relations in table Player
	 * @param request
	 */
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(schemaDelete));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Delete Form not valid', form);
			return fail(400, { form });
		}

		try {
			await deletePlayer(form.data.id);
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, withFiles({ form }));
		}
	}
};
