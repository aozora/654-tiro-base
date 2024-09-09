import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../../.svelte-kit/types/src/routes';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		console.log('no locals');
		return redirect(302, '/login');
	}

	return {
		user: event.locals.user
	};
};

export const actions: Actions = {
	// default: async (event) => {
	// 	if (!event.locals.session) {
	// 		return fail(401);
	// 	}
	//
	// 	await lucia.invalidateSession(event.locals.session.id);
	// 	const sessionCookie = lucia.createBlankSessionCookie();
	// 	event.cookies.set(sessionCookie.name, sessionCookie.value, {
	// 		path: '.',
	// 		...sessionCookie.attributes
	// 	});
	//
	// 	return redirect(302, '/login');
	// },

	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/login');
	}
};
