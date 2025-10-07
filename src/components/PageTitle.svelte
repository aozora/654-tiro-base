<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';

	type Props = {
		title: string;
		showBackButton?: boolean
	}

	let { title, showBackButton = false }: Props = $props();

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="mb-9 flex w-full items-center justify-center">
	{#if showBackButton}
		<Button type="button" variant="outline"
						class="mr-8 flex-0 cursor-pointer" onclick={goBack}>
			<ArrowLeft size="24" />
		</Button>
	{/if}

	<h1 class="font-serif text-4xl text-foreground">{title}</h1>
</div>
