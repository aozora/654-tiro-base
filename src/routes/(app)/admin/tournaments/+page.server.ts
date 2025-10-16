import type { Actions, PageServerLoad } from './$types';
import { deleteTournament, getTournaments, upsertTournament } from '$lib/server/repository';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Tournament } from '$lib/server/database/schema';
import { deleteSchema, schema } from './schema';
import { handleDelete, handleUpdate } from '$lib/server/action-helpers';

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
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data: any) => {
			await upsertTournament(
				data.id,
				data.title,
				data.isActive
			);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data: any) => {
			await deleteTournament(data.id);
		}, 'Torneo eliminato!');
	}
};
