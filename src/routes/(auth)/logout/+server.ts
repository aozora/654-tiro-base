/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// @ts-ignore
export const POST: RequestHandler = async (event) => {
	// @ts-ignore
	if (!event.locals.session) {
		return fail(401);
	}

	// @ts-ignore
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	redirect(302, '/login');
};
