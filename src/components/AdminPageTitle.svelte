<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let showBackButton: boolean = false;

	const goBack = () => {
		window.history.back();
	};
</script>

<div class={cn("mb-9 flex h-12 w-full cursor-pointer items-center justify-center",
"bg-gradient-to-b from-transparent via-black/40 to-transparent")}>
	{#if showBackButton}
		<Button type="button"
						variant="outline"
						class="mr-8 flex-0 cursor-pointer"
						onclick={()=> goBack()}>
			<ArrowLeft size="20" />
		</Button>
	{/if}

	<h1 class="font-serif text-4xl text-brand">
		{title}
		{#if subtitle}
			<span>{subtitle}</span>
		{/if}
	</h1>
</div>
