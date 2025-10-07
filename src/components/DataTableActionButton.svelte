<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PencilLine, Dices } from '@lucide/svelte';
	import type { Tournament } from '$lib/server/database/schema';

	type Props = {
		onclik?: (tournament: Tournament) => void;
		variant: 'edit' | 'dice';
		href?: string;
	}

	let { onclick, variant, href } = $props();
</script>

<Button
	type='button'
	variant='outline'
	onclick={ onclick }
	href={href}>
	{#if variant === 'edit'}
		<PencilLine size={ 24 } />
	{/if}
	{#if variant === 'dice'}
		<Dices size={ 24 } />
	{/if}
</Button>