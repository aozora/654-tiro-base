import { building } from '$app/env';
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	BETTER_AUTH_SECRET: {
		schema: (value) => {
			if (value) return value;
			if (building) return '';
			throw new Error('BETTER_AUTH_SECRET is required');
		}
	}
});
