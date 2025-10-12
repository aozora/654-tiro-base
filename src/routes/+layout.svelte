<script>
	import '$styles/app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";

	let { children } = $props();
</script>

<Toaster richColors position="top-center"/>
{@render children()}