import type { Actions, PageServerLoad } from './$types';
import { deleteTournament, getTournaments, upsertTournament } from '#lib/server/repository.ts';
import type { Tournament } from '#lib/server/database/schema.ts';
import { deleteSchema, schema } from './schema';
import { handleDelete, handleUpdate } from '#lib/server/action-helpers.ts';

export const load: PageServerLoad = async () => {
	const tournaments: Array<Tournament> = await getTournaments();

	return {
		tournaments
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data) => {
			await upsertTournament(data.id, data.title, data.isActive);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(
			request,
			deleteSchema,
			async (data) => {
				await deleteTournament(data.id);
			},
			'Torneo eliminato!'
		);
	}
};
