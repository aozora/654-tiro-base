import denoAdapter from '@deno/svelte-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: denoAdapter(),

		alias: {
			$components: 'src/components',
			$styles: 'src/styles',
			$types: 'src/types',
			$hooks: 'src/$hooks'
		}
	}
};

export default config;
