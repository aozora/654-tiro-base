<script lang="ts">
	import Icon, { type IconName } from '#components/Icon.svelte';
	import type { ButtonProps } from '#lib/components/ui/button/button.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { cn } from '#lib/utils.ts';

	type Props = ButtonProps & {
		icon?: IconName;
		label?: string;
	};

	let {
		icon,
		children,
		label,
		class: className,
		...buttonProps
	}: Props = $props();
</script>

<Button
	{...buttonProps}
	class={cn('flex h-11 w-full @2xl/table:h-9 @2xl/table:w-auto', className)}
>
	{#if icon}
		<Icon name={icon} size={24} aria-hidden="true" />
	{/if}
	{@render children?.()}
	{#if label}
		<!-- Visible in the stacked layout and in wide tables; icon-only in between -->
		<span class="@2xl/table:sr-only @3xl/table:not-sr-only">{label}</span>
	{/if}
</Button>
