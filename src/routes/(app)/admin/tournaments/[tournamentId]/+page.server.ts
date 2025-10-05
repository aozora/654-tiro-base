import type { Actions, PageServerLoad } from './$types';
import {
	deleteMatchDeep,
	getMatches,
	getPlayers,
	getTournament,
	upsertMatch
} from '$lib/server/repository';
import type { Match, Player, Tournament } from '$lib/server/db';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';

const schema = z
	.object({
		matchId: z.string(),
		tournamentId: z.string(),
		date: z.date()
	})
	.required();

const schemaDelete = z
	.object({
		matchId: z.string()
	})
	.required();

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const tournamentId: string = params.tournamentId;

	const tournament: Tournament = await getTournament(tournamentId);
	const players: Array<Player> = await getPlayers();
	const matches: Array<Match> = await getMatches(tournamentId);

	if (!tournament) {
		error(500, `Tournament with id ${tournamentId} not found`);
	}

	const form = await superValidate(zod(schema));

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
		const form = await superValidate(request, zod(schema));

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

			return fail(500);
		}
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, zod(schemaDelete));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Delete Form not valid', form);
			return fail(400, { form });
		}

		try {
			await deleteMatchDeep(form.data.matchId);
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500);
		}
	}
};
