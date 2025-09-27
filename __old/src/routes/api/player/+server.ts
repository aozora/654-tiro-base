import { updatePlayerPicture } from '$lib/server/db/repository';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { id, picture } = await request.json();
	console.log({ id, picture });

	try {
		await updatePlayerPicture(id, picture);
	} catch (err) {
		console.log(err);

		error(500, `Error updatePlayerPicture id=${id} picture=${picture}`);
	}

	return json(true);
};
