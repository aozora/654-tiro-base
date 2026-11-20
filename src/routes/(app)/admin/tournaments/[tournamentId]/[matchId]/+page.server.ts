import type { Actions, PageServerLoad } from './$types';
import {
	getMatch,
	getMatchPlayers,
	getPlayers,
	getTournament,
	type PlayerExtended,
	removePlayerFromMatch,
	upsertMatchPlayer
} from '#lib/server/repository.ts';
import type { Player, Tournament } from '#lib/server/database/schema.ts';
import { deleteSchema, schema } from './schema';
import { handleDelete, handleUpdate } from '#lib/server/action-helpers.ts';

export const load: PageServerLoad = async ({ params }) => {
	const { matchId, tournamentId } = params;
	const match = await getMatch(matchId);
	const tournament: Tournament = await getTournament(tournamentId);
	const allPlayers: Array<Player> = await getPlayers();
	const players: Array<PlayerExtended> = await getMatchPlayers(matchId);

	return {
		match,
		tournament,
		allPlayers: allPlayers.filter((player) => player.isActive),
		players
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		return handleUpdate(request, schema, async (data) => {
			await upsertMatchPlayer(data.matchId, data.playerId, data.points, data.territoriesPoints);
		});
	},

	delete: async ({ request }) => {
		return handleDelete(request, deleteSchema, async (data) => {
			await removePlayerFromMatch(data.matchId, data.playerId);
		});
	}
};
