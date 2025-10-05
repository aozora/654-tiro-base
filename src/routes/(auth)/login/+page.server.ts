import { auth } from '$lib/auth.server';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { valibot, zod4 } from 'sveltekit-superforms/adapters';
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
	// const form = await superValidate(zod4(formSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, valibot(formSchema));
		// const form = await superValidate(event, zod4(formSchema));
		console.log(`🍉 Form valid: `, form.valid, form);
		// console.log(`🍉 request: `, await request.formData());

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password,
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
