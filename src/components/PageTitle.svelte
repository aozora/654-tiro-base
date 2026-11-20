<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { cn } from '#lib/utils.ts';
	import { goBack } from '#lib/utils/navigation.ts';

	type Props = {
		title: string;
		subtitle?: string;
		showBackButton?: boolean;
		variant?: 'default' | 'admin';
	};

	let {
		title,
		subtitle,
		showBackButton = false,
		variant = 'default',
	}: Props = $props();
</script>

<!-- Side columns have equal width so the title stays centred with or without the back button -->
<div
	class="mx-auto grid w-full max-w-3xl grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-x-2 gap-y-1 px-4 pt-6 pb-6 md:px-6 md:pt-10"
>
	{#if showBackButton}
		<Button
			type="button"
			variant="outline"
			size="icon-lg"
			class="size-11 cursor-pointer"
			aria-label="Indietro"
			onclick={goBack}
		>
			<ArrowLeft aria-hidden="true" />
		</Button>
	{/if}

	<h1
		class={cn(
			'col-start-2 text-center font-serif text-3xl text-balance wrap-anywhere md:text-4xl',
			variant === 'admin' ? 'font-bold text-primary' : 'text-foreground',
		)}
	>
		{title}
	</h1>

	{#if subtitle}
		<p class="col-start-2 text-center text-sm text-muted-foreground">
			{subtitle}
		</p>
	{/if}
</div>
