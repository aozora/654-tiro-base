<script>
	import '#styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import NavigationProgress from '#components/NavigationProgress.svelte';
	import { Toaster } from '#lib/components/ui/sonner/index.js';

	let { children } = $props();

	// Animate between pages: the browser snapshots the old page, the new one is
	// rendered, and the two are blended (see the view-transition rules in app.css).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher />
<Toaster richColors position="top-center" />
<NavigationProgress />
{@render children()}
