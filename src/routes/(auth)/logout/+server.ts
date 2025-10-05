import { auth } from '$lib/auth.server';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	await auth.api.signOut({
		headers: event.request.headers
	});

	redirect(302, '/login');
};
