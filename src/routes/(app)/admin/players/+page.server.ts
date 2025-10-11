import { deletePlayer, getPlayers, upsertPlayer } from '$lib/server/repository';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { schemaUpdate } from './schema';
import type { Player } from '$lib/server/database/schema';



/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	const form = await superValidate(valibot(schemaUpdate));

	return {
		players,
		form
	};
};

/**
 * Page Action
 */
// export const actions: Actions = {
// 	update: async ({ request }) => {
// 		const form = await superValidate(request, zod(schemaUpdate));
//
// 		if (!form.valid) {
// 			// Again, always return form and things will just work.
// 			console.error('Form not valid', form);
// 			return fail(400, { form });
// 		}
//
// 		try {
// 			await upsertPlayer(
// 				form.data.id === 'undefined' ? '' : String(form.data.id),
// 				form.data.name,
// 				form.data.picture || '',
// 				form.data.isActive
// 			);
//
// 			return message(form, 'success');
// 		} catch (error: unknown) {
// 			console.error(error);
//
// 			return fail(500);
// 		}
// 	},
//
// 	/**
// 	 * NOTE: delete don't work cause of FK relations in table Player
// 	 * @param request
// 	 */
// 	delete: async ({ request }) => {
// 		const form = await superValidate(request, zod(schemaDelete));
//
// 		if (!form.valid || !form.data.id) {
// 			// Again, always return form and things will just work.
// 			console.error('Delete Form not valid', form);
// 			return fail(400, { form });
// 		}
//
// 		try {
// 			await deletePlayer(form.data.id);
// 			return message(form, 'success');
// 		} catch (error: unknown) {
// 			console.error(error);
//
// 			return fail(500);
// 		}
// 	}
// };
