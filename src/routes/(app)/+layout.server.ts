/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	// @ts-ignore
	if (!event.locals.user) {
		console.log('no user');
		return redirect(302, '/login');
	}

	return {
		// @ts-ignore
		user: event.locals.user
	};
};
