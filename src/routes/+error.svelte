<script>
	import { page } from '$app/state';
	import Main from '$components/Main.svelte';

	import '$styles/app.css';
	import { Bug } from '@lucide/svelte';
</script>

<Main className="error-page w-full h-full flex items-center justify-center">
	<div class="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center">
		<h1 clasS="text-4xl text-primary text-center mb-20">Porco Dio, c'è un errore...</h1>
		<h2 class="text-2xl text-secondary text-center">{page.status} {page.error?.message}</h2>

		<Bug size="64" class="my-10" />

		<a href="/leaderboard" class="underline">Torna all'inizio</a>
	</div>
</Main>

