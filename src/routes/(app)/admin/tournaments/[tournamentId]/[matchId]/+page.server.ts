import type { Actions, PageServerLoad } from './$types';
import {
	getMatch,
	getMatchPlayers,
	getPlayers,
	getTournament,
	type PlayerExtended,
	removePlayerFromMatch,
	upsertMatchPlayer
} from '$lib/server/repository';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Player, Tournament } from '$lib/server/database/schema';
import { schema } from './schema';
import { deleteSchema } from './schema';
import { handleDelete, handleUpdate } from '$lib/server/action-helpers';


/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { matchId, tournamentId } = params;
	const match = await getMatch(matchId);
	const tournament: Tournament = await getTournament(tournamentId);
	const allPlayers: Array<Player> = await getPlayers();
	const players: Array<PlayerExtended> = await getMatchPlayers(matchId);
	const form = await superValidate(valibot(schema));
	return {
		match,
		tournament,
		allPlayers,
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
			await upsertMatchPlayer(data.matchId, data.playerId, data.points, data.territoriesPoints);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data: any) => {
			await removePlayerFromMatch(data.matchId, data.playerId);
		});
	}
};
