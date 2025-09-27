/* eslint-disable @typescript-eslint/ban-ts-comment */
import { auth } from '$lib/server/better-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// @ts-ignore
export const POST: RequestHandler = async (event) => {
	// @ts-ignore
	if (!event.locals.session) {
		return fail(401);
	}

	await auth.api.signOut({
		request: event.request,
		headers: event.request.headers
	});

	redirect(302, '/login');
};
