import { auth } from '$lib/auth.server';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';
import { APIError } from 'better-auth';

export const load: PageServerLoad = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		redirect(302, '/leaderboard');
	}

	const form = await superValidate(valibot(formSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(valibot(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password
					// callbackURL: '/'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return setError(form, error.message || 'Signin failed');
			}
			console.error('Unexpected error during sign in', error);
			return setError(form, 'Unexpected error');
		}

		redirect(302, '/leaderboard');
	}
} satisfies Actions;
