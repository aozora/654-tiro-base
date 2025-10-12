import { auth } from '$lib/auth.server.js';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ request }) => {
	return await auth.handler(request);
};

export const POST: RequestHandler = async ({ request }) => {
	return await auth.handler(request);
};
