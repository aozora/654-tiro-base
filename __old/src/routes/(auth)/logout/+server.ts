import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	await auth.api.signOut({
		headers: event.request.headers
	});

	redirect(302, '/login');
};
