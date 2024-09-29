/* eslint-disable @typescript-eslint/ban-ts-comment */
import { authSchema } from '$lib/schemas/auth-schema';
import { lucia } from '$lib/server/auth';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// @ts-ignore
	if (locals.user) {
		redirect(302, '/leaderboard');
	}

	const form = await superValidate(zod(authSchema));
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(authSchema));
		// console.log(`Form is valid: ${form.valid}`);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		try {
			const user = await prisma.user.findUnique({
				where: {
					email: form.data.email
				}
			});

			if (!user) {
				console.log('no user');
				return message(form, 'Incorrect username or password', { status: 400 });
			}

			const validPassword = await new Argon2id().verify(user.password, form.data.password);

			if (!validPassword) {
				console.log('no valid pwd');
				return message(form, 'Incorrect username or password', { status: 400 });
			}

			const session = await lucia.createSession(user.id, []);
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			console.log('...redirecting to leaderboard');
			redirect(302, '/leaderboard');
		} catch (e) {
			console.error(e);
			return fail(500, {
				message: 'An unknown error occurred',
				form
			});
		}
	}
} satisfies Actions;
