import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: [vitePreprocess()],

			adapter: adapter({
				// if true, will create a Netlify Edge Function rather
				// than using standard Node-based functions
				edge: false,

				// if true, will split your app into multiple functions
				// instead of creating a single one for the entire app.
				// if `edge` is true, this option cannot be used
				split: false
			})
		}),
		devtoolsJson()
	]
});
