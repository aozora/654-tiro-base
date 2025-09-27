// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { sveltePhosphorOptimize } from 'phosphor-svelte/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		alias: {
			$components: 'src/components',
			$styles: 'src/styles',
			$types: 'src/types',
			$hooks: 'src/$hooks'
		}
	}
};

export default config;
