<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.ts';

	type Props = {
		className?: string;
		children?: Snippet;
	};

	let { className, children }: Props = $props();
</script>

<!-- Bottom padding leaves room for the mobile tab bar and the home indicator -->
<main
	id="main"
	class={cn(
		'main flex w-full flex-1 flex-col px-4 [view-transition-name:page] md:px-6 lg:px-8',
		'pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:pb-12',
		className,
	)}
>
	{@render children?.()}
</main>
