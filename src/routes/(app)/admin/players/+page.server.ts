import { deletePlayer, getPlayers, upsertPlayer } from '#lib/server/repository.ts';
import type { Actions, PageServerLoad } from './$types';
import { deleteSchema, schema } from './schema';
import type { Player } from '#lib/server/database/schema.ts';
import { handleDelete, handleUpdate } from '#lib/server/action-helpers.ts';

export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();

	return {
		players
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data) => {
			await upsertPlayer(data.id, data.name, data.picture || '', data.isActive);
		});
	},

	/**
	 * NOTE: delete don't work cause of FK relations in table Player
	 */
	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data) => {
			await deletePlayer(data.id);
		});
	}
};
