import type { RequestHandler } from './$types';
// import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		console.log('logout, no session available');
		return new Response(null, { status: 401 });
	}

	console.log(event.locals.session);
	//
	// await invalidateSession(event.locals.session.id);
	// deleteSessionTokenCookie(event);

	return new Response(null, { status: 302, headers: { Location: '/login' } });
};
