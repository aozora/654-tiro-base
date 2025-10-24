import type { RequestHandler } from './$types';
import { auth } from '$lib/auth.server';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		console.log('logout, no session available');
		return new Response(null, { status: 401 });
	}

	await auth.api.signOut({
		// This endpoint requires session cookies.
		headers: event.request.headers,
	});

	return new Response(null, { status: 302, headers: { Location: '/login' } });
};
