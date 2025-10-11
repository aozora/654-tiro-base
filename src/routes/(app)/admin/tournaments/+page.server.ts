import type { Actions, PageServerLoad } from './$types';
import { getTournaments, upsertTournament } from '$lib/server/repository';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { invalidate } from '$app/navigation';
import type { Tournament } from '$lib/server/database/schema';
import { schema } from './schema';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournaments: Array<Tournament> = await getTournaments();
	const form = await superValidate(valibot(schema));

	return {
		tournaments,
		form
	};
};

/**
 * Page Action
 */
// export const actions: Actions = {
// 	default: async ({ request }) => {
// 		const form = await superValidate(request, zod(schemaUpdate));
//
// 		if (!form.valid) {
// 			// Again, always return form and things will just work.
// 			console.error('Form not valid', form);
// 			return fail(400, { form });
// 		}
//
// 		try {
// 			await upsertTournament(
// 				form.data.id === 'undefined' ? '' : String(form.data.id),
// 				form.data.title,
// 				form.data.isActive
// 			);
//
// 			return message(form, 'success');
// 		} catch (error: unknown) {
// 			console.error(error);
//
// 			return fail(500);
// 		}
// 	}
// };
