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
import { message, superValidate, fail } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Player, Tournament } from '$lib/server/database/schema';
import { schema } from './schema';
import { deleteSchema } from './schema';


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
		const form = await superValidate(request, valibot(schema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Form not valid', form);
			return fail(400, { form, message: 'Form not valid' });
		}

		try {
			await upsertMatchPlayer(form.data.matchId, form.data.playerId, form.data.points);

			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500);
		}
	},

	/**
	 * NOTE: delete don't work cause of FK relations in table Player
	 * @param request
	 */
	delete: async ({ request }) => {
		const form = await superValidate(request, valibot(deleteSchema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Delete Form not valid', form);
			return fail(400, { form, message: 'Form not valid' });
		}

		try {
			await removePlayerFromMatch(form.data.matchId, form.data.playerId);
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500);
		}
	}
};
