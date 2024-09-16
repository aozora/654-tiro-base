import { error, json } from '@sveltejs/kit';
import { updatePlayerPicture } from '$lib/server/repository';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id, picture } = await request.json();

	try {
		await updatePlayerPicture(id, picture);
	} catch (err) {
		console.log(err);

		error(500, `Error updatePlayerPicture id=${id} picture=${picture}`);
	}

	return json(true);
}
