import { authSchema } from '$lib/schemas/auth-schema';
import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		redirect(302, '/leaderboard');
	}

	const form = await superValidate(zod4(authSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(authSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password
				},
				headers: request.headers
			});

			if (!result) {
				return message(form, 'Incorrect username or password', { status: 400 });
			}

			return { form };
		} catch (e) {
			console.error(e);
			return message(form, 'Incorrect username or password', { status: 400 });
		}
	}
} satisfies Actions;
