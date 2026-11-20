<script lang="ts">
	import { cn } from '#lib/utils.ts';

	type Props = {
		name: string;
		picture?: string | null;
		/** Rendered size in CSS pixels, used to reserve the image box. */
		size?: number;
		/** Set for avatars visible without scrolling. */
		eager?: boolean;
		class?: string;
	};

	let {
		name,
		picture,
		size = 36,
		eager = false,
		class: className,
	}: Props = $props();

	let failed = $state(false);
</script>

<span
	class={cn(
		'relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full',
		'bg-muted text-xs font-semibold text-muted-foreground uppercase select-none',
		className,
	)}
>
	<span aria-hidden="true">{name.slice(0, 2)}</span>
	{#if picture && !failed}
		<img
			src={picture}
			alt=""
			width={size}
			height={size}
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
			class="absolute inset-0 size-full object-cover"
			onerror={() => (failed = true)}
		/>
	{/if}
</span>
