import { auth } from '$lib/auth.server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		return redirect(302, '/');
	}
	return {};
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const { email, password } = Object.fromEntries(formData) as Record<string, string>;

		try {
			const result = await auth.api.signUpEmail({
				body: {
					email,
					password,
					name: email.split('@')[0] // Use email prefix as name
				},
				headers: event.request.headers
			});

			if (!result) {
				return fail(400, {
					message: 'Failed to create account'
				});
			}

			redirect(302, '/leaderboard');
		} catch (e) {
			console.error(e);
			return fail(500, {
				message: 'Email already in use or an error occurred'
			});
		}
	}
} satisfies Actions;
