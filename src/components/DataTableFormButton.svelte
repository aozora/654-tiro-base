<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as LucideIcons from '@lucide/svelte';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
	import Icon from '$components/Icon.svelte';

	type Props = ButtonProps & {
		icon?: keyof typeof LucideIcons;
		label?: string;
		action: string;
		enhance: any
		ids: Array<{ name: string, value: string }>
		onSubmit?: (e: SubmitEvent) => void;
	};

	let { icon, children, label, onSubmit, enhance, action, ids, ...buttonProps }: Props = $props();
</script>

<form
	action={action}
	method="POST"
	onsubmit={e => onSubmit?.(e)}
>
	{#each ids as id}
		<input type="hidden" name={id.name} value={id.value} />
	{/each}

	<Button {...buttonProps}>
		{#if icon}
			<Icon name={icon} size={24} />
		{/if}
		{@render children?.()}
		{#if label}
			<span class="sr-only sm:not-sr-only">{label}</span>
		{/if}
	</Button>
</form>