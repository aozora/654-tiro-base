import { auth } from '$lib/server/better-auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};

export const POST: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};

export const PUT: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};

export const DELETE: RequestHandler = async ({ request }) => {
	return auth.handler(request);
};
