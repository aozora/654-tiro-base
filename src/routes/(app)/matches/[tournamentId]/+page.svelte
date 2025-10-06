<script lang="ts">
	import type { Match, Tournament } from '$lib/server/database/schema';
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from 'lucide-svelte';

	type PageProps = {
		matches: Array<Match>;
		tournament: Tournament;
	};

	const { matches, tournament }: PageProps = $props();
</script>

<Main className="matches-page">
	<div class="matches">
		<PageTitle title={`Cronologia partite`} showBackButton={true} />

		<div class="matches-wrapper mx-auto w-full max-w-3xl">
			<h2 class="h-12 w-full text-center">
				{#if matches}
					{matches.length} partite giocate.
				{/if}
			</h2>

			<ul class="flex flex-col gap-5">
				{#each matches as match}
					<li class="h-12">
						<Button
							href={`/matches/${tournament.id}/${match.id}`}
							variant="secondary"
							class="flex items-center justify-between gap-4 h-12 w-full bg-indigo-500 hover:bg-indigo-700"
						>
							<strong>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</strong>
							<ChevronRight size={24} />
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Main>
