import { auth } from '$lib/server/better-auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session from better-auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Populate event.locals for server-side access
	if (session) {
		event.locals.user = session.user;
		event.locals.session = session.session;
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	// Handle better-auth routes
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
};
