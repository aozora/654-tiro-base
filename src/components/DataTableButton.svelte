<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as LucideIcons from '@lucide/svelte';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
	import Icon from '$components/Icon.svelte';

	type Props = ButtonProps & {
		icon?: keyof typeof LucideIcons;
		label?: string;
	};

	let { icon, children, label, ...buttonProps }: Props = $props();
</script>

<Button {...buttonProps}>
	{#if icon}
		<Icon name={icon} size={24} />
	{/if}
	{@render children?.()}
	{#if label}
		<span class="sr-only sm:not-sr-only">{label}</span>
	{/if}
</Button>