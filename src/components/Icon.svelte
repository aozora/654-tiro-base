<script lang="ts">
	import * as icons from '@lucide/svelte';

	type Props = {
		name: keyof typeof icons;
		[key: string]: unknown;
	};

	let { name, ...props }: Props = $props();
	const Icon = $derived(icons[name]);
</script>

{#if Icon && typeof Icon !== 'object'}
	<Icon {...props} />
{/if}