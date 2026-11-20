<script lang="ts">
	import Header from '#components/Header.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<!-- Decorative backdrop: fixed, so it is painted once instead of on every scroll -->
<div class="fixed inset-x-0 top-0 -z-10 h-lvh" aria-hidden="true">
	<img
		src="/img/bg-board.webp"
		alt=""
		width="1000"
		height="693"
		fetchpriority="low"
		decoding="async"
		class="size-full object-cover"
	/>
	<div class="absolute inset-0 bg-background/85"></div>
</div>

<div class="flex min-h-dvh flex-col">
	<Header user={data.user} />

	{@render children()}
</div>
