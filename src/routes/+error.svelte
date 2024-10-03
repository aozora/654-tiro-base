<script>
	import { page } from '$app/stores';
	import { SmileyMelting } from 'phosphor-svelte';
	import Main from '$components/Main.svelte';

	import '$styles/app.scss';
</script>

<Main className="error-page">
	<div>
		<h1>Porco Dio, c'è un errore...</h1>
		<h2>{$page.status} {$page.error?.message}</h2>

		<SmileyMelting size="64" />

		<br>

		<a href="/leaderboard">Torna all'inizio</a>
	</div>
</Main>

