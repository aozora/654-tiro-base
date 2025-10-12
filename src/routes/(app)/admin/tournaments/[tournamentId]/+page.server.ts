import type { Actions, PageServerLoad } from './$types';
import {
	deleteMatchDeep,
	getMatches,
	getPlayers,
	getTournament,
	upsertMatch
} from '$lib/server/repository';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';
import type { Match, Player, Tournament } from '$lib/server/database/schema';
import { schema } from './schema';
import { deleteSchema } from '../schema';
import { handleDelete, handleUpdate } from '$lib/server/action-helpers';


/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId } = params;

	const tournament: Tournament = await getTournament(tournamentId);
	const players: Array<Player> = await getPlayers();
	const matches: Array<Match> = await getMatches(tournamentId);

	if (!tournament) {
		error(500, `Tournament with id ${tournamentId} not found`);
	}

	const form = await superValidate(valibot(schema));

	return {
		tournament,
		players,
		matches,
		form
	};
};

/**
 * Page Action
 */
export const actions: Actions = {
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data: any) => {
			await upsertMatch(
				data.matchId,
				data.tournamentId,
				data.date
			);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data: any) => {
			await deleteMatchDeep(data.id);
		});
	}
};
