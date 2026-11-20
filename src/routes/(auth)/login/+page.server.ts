import { auth } from '#lib/auth.server.ts';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';
import { APIError } from 'better-auth';
import * as v from 'valibot';

export const load: PageServerLoad = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		redirect(302, '/leaderboard');
	}

	return {};
};

export const actions = {
	default: async (event) => {
		const parsed = v.safeParse(formSchema, await event.request.json());

		if (!parsed.success) {
			return fail(400, { message: 'Form not valid' });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: parsed.output.email,
					password: parsed.output.password
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' });
			}
			console.error('Unexpected error during sign in', error);
			return fail(500, { message: 'Unexpected error' });
		}

		redirect(302, '/leaderboard');
	}
} satisfies Actions;
