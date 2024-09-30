import type { Actions, PageServerLoad } from './$types';
import { getTournaments, upsertTournament } from '$lib/server/repository';
import type { Tournament } from '@prisma/client';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { invalidate } from '$app/navigation';

const schemaUpdateTemp = z.object({
	id: z.string().nullable().optional(),
	title: z.string().min(2),
	isActive: z.boolean()
});
const schemaUpdate = schemaUpdateTemp.required({
	// id is false to allow new items
	title: true,
	isActive: true
});

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const tournaments: Array<Tournament> = await getTournaments();
	const form = await superValidate(zod(schemaUpdate));

	return {
		tournaments,
		form
	};
};

/**
 * Page Action
 */
export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schemaUpdate));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Form not valid', form);
			return fail(400, { form });
		}

		try {
			await upsertTournament(
				form.data.id === 'undefined' ? '' : String(form.data.id),
				form.data.title,
				form.data.isActive
			);

			await invalidate('admin:tournaments');
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500);
		}
	}
};
