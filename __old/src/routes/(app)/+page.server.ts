/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load:  PageServerLoad = async ({ locals }) => {
	// @ts-ignore
	if (locals.user) {
		redirect(302, '/leaderboard');
	}

	redirect(302, '/login');
};
