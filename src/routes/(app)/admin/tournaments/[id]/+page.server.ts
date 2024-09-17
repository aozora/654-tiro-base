import type { Actions, PageServerLoad } from './$types';
import {
	addPlayerToTournament,
	deletePlayer,
	getPlayers,
	getTournamentPlayers,
	type TournamentWithPlayers,
	upsertTournament
} from '$lib/server/repository';
import type { Player, Tournament } from '@prisma/client';
import { message, superValidate, fail, withFiles } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';

const schema = z
	.object({
		id: z.string(),
		player: z.string()
	})
	.required();

const schemaDelete = z
	.object({
		playerId: z.string()
	})
	.required();

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const id: string = params.id; // YYYYMM

	const players: Array<Player> = await getPlayers();
	const tournamentWithPlayers: TournamentWithPlayers | null = await getTournamentPlayers(id);

	if (!tournamentWithPlayers) {
		error(500, `Tournament with id ${id} not found`);
	}

	const form = await superValidate(zod(schema));

	return {
		players,
		tournamentWithPlayers,
		form,
		tournamentId: id
	};
};

/**
 * Page Action
 */
export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			// Again, always return form and things will just work.
			console.error('Form not valid', form);
			return fail(400, { form });
		}

		try {
			await addPlayerToTournament(String(form.data.id), form.data.player);

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
			await deletePlayer(form.data.id);
			return message(form, 'success');
		} catch (error: unknown) {
			console.error(error);

			return fail(500, withFiles({ form }));
		}
	}
};
