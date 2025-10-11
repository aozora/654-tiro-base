import type { Actions, PageServerLoad } from './$types';
import { deleteTournament, getTournaments, upsertTournament } from '$lib/server/repository';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Tournament } from '$lib/server/database/schema';
import { deleteSchema, schema } from './schema';

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
export const actions: Actions = {
	edit: async ({ request }) => {
		const form = await superValidate(request, valibot(schema));

		if (!form.valid) {
			console.error('Form not valid', form);
			return fail(400, { form, message: 'Form not valid' });
		}

		try {
			await upsertTournament(
				form.data.id,
				form.data.title,
				form.data.isActive
			);

			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, { form, message: 'Something went wrong' });
		}
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, valibot(deleteSchema));

		if (!form.valid) {
			console.error('Form not valid', form);
			return fail(400, { form, message: 'Form not valid' });
		}

		try {
			const deleted = await deleteTournament(
				form.data.id
			);

			console.log(`🍉   Deleted tournament ${deleted.id}`);

			return message(form, 'Torneo eliminato!');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, { form, message: 'Something went wrong' });
		}
	}
};
