import { deserialize, type ActionResult } from '$app/forms';
import { goto, invalidateAll } from '$app/navigation';

export async function postAction(url: string, values: unknown): Promise<ActionResult> {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'text/plain',
			'x-sveltekit-action': 'true'
		},
		body: JSON.stringify(values)
	});
	const result = deserialize(await response.text());

	if (result.type === 'redirect') {
		await goto(result.location);
	} else if (result.type === 'success') {
		await invalidateAll();
	}

	return result;
}

export function failureMessage(result: ActionResult, fallback: string) {
	if (result.type !== 'failure') return fallback;
	const data: unknown = result.data;
	if (
		data &&
		typeof data === 'object' &&
		'message' in data &&
		typeof data.message === 'string'
	) {
		return data.message;
	}
	return fallback;
}
