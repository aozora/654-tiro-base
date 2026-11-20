<script>
	import { page } from '$app/state';
	import { Bug } from '@lucide/svelte';
	import '#styles/app.css';
	import Main from '#components/Main.svelte';
</script>

<Main className="error-page w-full h-full flex items-center justify-center">
	<div
		class="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 lg:px-8"
	>
		<h1 clasS="text-4xl text-primary text-center mb-20">
			Porco Dio, c'è un errore...
		</h1>
		<h2 class="text-center text-2xl text-muted-foreground">
			{page.status}
			{page.error?.message}
		</h2>

		<Bug size="64" class="my-10" />

		<a href="/leaderboard" class="underline">Torna all'inizio</a>
	</div>
</Main>
