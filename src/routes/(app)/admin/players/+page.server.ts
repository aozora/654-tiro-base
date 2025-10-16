import { deletePlayer, getPlayers, upsertPlayer } from '$lib/server/repository';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { deleteSchema, schema } from './schema';
import type { Player } from '$lib/server/database/schema';
import { handleDelete, handleUpdate } from '$lib/server/action-helpers';

/**
 * Page Load
 */
export const load: PageServerLoad = async () => {
	const players: Array<Player> = await getPlayers();
	const form = await superValidate(valibot(schema));

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
		return handleUpdate(request, schema, async (data: any) => {
			await upsertPlayer(
				data.id,
				data.name,
				data.picture || '',
				data.isActive
			);
		});
	},

	/**
	 * NOTE: delete don't work cause of FK relations in table Player
	 */
	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data: any) => {
			await deletePlayer(data.id);
		});
	}
};
