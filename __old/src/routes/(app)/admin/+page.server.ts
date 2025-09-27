/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// @ts-ignore
	if (!event.locals.user) {
		console.log('no user');
		redirect(302, '/login');
	}

	return {
		// @ts-ignore
		user: event.locals.user
	};
};
