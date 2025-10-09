<script lang="ts">
	import { Trash2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		action: string;
		variant: 'delete';
		onSubmit: (e: any) => void
		enhance: any
		ids: Array<{ name: string, value: string }>
	}

	let { action, variant, onSubmit, enhance, ids } = $props();
</script>


<form
	action={action}
	method="POST"
	onsubmit={onSubmit}
	use:enhance
>
	{#each ids as id}
		<input type="hidden" name={id.name} value={id.value} />
	{/each}

	<Button type="submit"
					variant="destructive"
					class="cursor-pointer">
		<Trash2 size="24" />
	</Button>
</form>