import type { Actions, PageServerLoad } from './$types';
import {
	deleteMatchDeep,
	getMatches,
	getPlayers,
	getTournament,
	upsertMatch
} from '$lib/server/repository';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';
import type { Match, Player, Tournament } from '$lib/server/database/schema';
import { schema } from './schema';
import { deleteSchema } from '../schema';


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
		const form = await superValidate(request, valibot(schema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Form not valid', form);
			return fail(400, { form });
		}

		try {
			await upsertMatch(
				String(form.data.matchId),
				String(form.data.tournamentId),
				new Date(form.data.date)
			);

			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, { form, message: 'Something went wrong' });
		}
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, valibot(deleteSchema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Delete Form not valid', form);
			return fail(400, { form });
		}

		try {
			await deleteMatchDeep(form.data.id);
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, { form, message: 'Something went wrong' });
		}
	}
};
