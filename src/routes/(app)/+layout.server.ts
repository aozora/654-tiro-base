/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// @ts-ignore
	if (!locals.user) {
		console.log('no user');
		return redirect(302, '/login');
	}

	return {
		// @ts-ignore
		user: locals.user
	};
};
