<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as LucideIcons from '@lucide/svelte';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
	import Icon from '$components/Icon.svelte';

	type Props = ButtonProps & {
		icon?: keyof typeof LucideIcons;
	};

	let { icon, children, ...buttonProps }: Props = $props();
</script>

<Button {...buttonProps}>
	{#if icon}
		<Icon name={icon} size={24} />
	{/if}
	{@render children?.()}
</Button>