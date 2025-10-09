<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PencilLine, Dices } from '@lucide/svelte';
	import type { Tournament } from '$lib/server/database/schema';

	type Props = {
		onclick?: (tournament: Tournament) => void;
		variant: 'edit' | 'dice';
		href?: string;
	}

	let { onclick, variant, href }:Props = $props();
</script>

<Button
	variant='outline'
	onclick={ onclick }
	href={href}
	type='button'
	class="cursor-pointer">
	{#if variant === 'edit'}
		<PencilLine size={ 24 } />
	{/if}
	{#if variant === 'dice'}
		<Dices size={ 24 } />
	{/if}
</Button>
