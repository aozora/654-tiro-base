<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { goBack } from '$lib/utils/navigation';

	type Props = {
		title: string;
		subtitle?: string;
		showBackButton?: boolean;
		variant?: 'default' | 'admin';
	}

	let { title, subtitle, showBackButton = false, variant = 'default' }: Props = $props();

	const isAdmin = variant === 'admin';
	const iconSize = isAdmin ? 20 : 24;
	const titleClasses = isAdmin
		? "font-serif text-4xl text-primary font-bold"
		: "font-serif text-4xl text-foreground";
	const containerClasses = isAdmin
		? "mb-9 flex h-12 w-full cursor-pointer items-center justify-center bg-gradient-to-b from-black/40 to-transparent"
		: "mb-9 flex w-full items-center justify-center bg-gradient-to-b from-black/40 to-transparent";
</script>

<div class={cn(containerClasses)}>
	{#if showBackButton}
		<Button
			type="button"
			variant="outline"
			class="mr-8 flex-0 cursor-pointer"
			onclick={goBack}
		>
			<ArrowLeft size={iconSize} />
		</Button>
	{/if}

	<h1 class={titleClasses}>
		{title}
		{#if subtitle}
			<span>{subtitle}</span>
		{/if}
	</h1>
</div>
