import type { Actions, PageServerLoad } from './$types';
import {
	deleteMatchDeep,
	getMatches,
	getPlayers,
	getTournament,
	upsertMatch
} from '#lib/server/repository.ts';
import { error } from '@sveltejs/kit';
import type { Match, Player, Tournament } from '#lib/server/database/schema.ts';
import { schema } from './schema';
import { deleteSchema } from '../schema';
import { handleDelete, handleUpdate } from '#lib/server/action-helpers.ts';

export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId } = params;

	const tournament: Tournament = await getTournament(tournamentId);
	const players: Array<Player> = await getPlayers();
	const matches: Array<Match> = await getMatches(tournamentId);

	if (!tournament) {
		error(500, `Tournament with id ${tournamentId} not found`);
	}

	return {
		tournament,
		players,
		matches
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data) => {
			await upsertMatch(data.matchId, data.tournamentId, data.date);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data) => {
			await deleteMatchDeep(data.id);
		});
	}
};
