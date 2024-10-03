<script>
	import { page } from '$app/stores';
	import { SmileyMelting } from 'phosphor-svelte';
</script>

<h1>{$page.status} {$page.error?.message}</h1>
<span style="font-size: 10em">
	<SmileyMelting size="24"/>
</span>
