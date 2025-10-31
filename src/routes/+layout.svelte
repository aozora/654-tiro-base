<script>
	import '$styles/app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>


<ModeWatcher />
<Toaster richColors position="top-center"/>
{@render children()}