<script lang="ts">
	import Main from '#components/Main.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Main className="px-0 pb-0 sm:pb-0 md:px-0 lg:px-0">
	{@render children()}
</Main>
