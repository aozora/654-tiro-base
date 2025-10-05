<script>
	import { page } from '$app/state';
	import Main from '$components/Main.svelte';

	import '$styles/app.css';
	import { Bug } from 'lucide-svelte';
</script>

<Main className="error-page w-full h-full flex items-center justify-center">
	<div class="max-w-3xl mx-auto px-6 lg:px-8">
		<h1>Porco Dio, c'è un errore...</h1>
		<h2>{page.status} {page.error?.message}</h2>

		<Bug size="64" />

		<br>

		<a href="/leaderboard">Torna all'inizio</a>
	</div>
</Main>

