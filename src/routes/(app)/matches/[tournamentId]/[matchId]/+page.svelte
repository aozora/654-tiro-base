<script lang="ts">
	/**
	 * Display the final ranking of a match
	 */
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import { formatDate } from '#lib/helpers.ts';
	import { cn } from '#lib/utils.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { match, matchPlayers, tournament } = $derived(data);
</script>

<PageTitle
	title={`Partita del ${formatDate(match.date)}`}
	subtitle={tournament.title}
	showBackButton={true}
/>

<Main>
	<div class="mx-auto w-full max-w-xl">
		{#if matchPlayers.length > 0}
			<ol class="panel divide-y">
				{#each matchPlayers as player (player.playerId)}
					<li class={cn('panel-row', player.rank === 1 && 'bg-primary/15')}>
						<span
							class={cn(
								'w-6 shrink-0 text-center font-semibold tabular-nums',
								player.rank > 1 && 'text-muted-foreground',
							)}
						>
							<span class="sr-only">Posizione </span>{player.rank}
						</span>
						<PlayerAvatar name={player.name} picture={player.picture} eager />
						<strong class="min-w-0 flex-1 truncate text-base"
							>{player.name}</strong
						>
						<span
							class="flex shrink-0 flex-col items-end gap-2 text-sm text-muted-foreground"
						>
							<span>
								<strong class="text-base text-foreground tabular-nums"
									>{player.sumPoints}</strong
								>
								pt
							</span>
							<span class="text-xs tabular-nums"
								>{player.sumTerritoriesPoints} territori</span
							>
						</span>
					</li>
				{/each}
			</ol>
		{:else}
			<p class="panel px-6 py-12 text-center text-lg text-muted-foreground">
				Nessun punteggio registrato per questa partita.
			</p>
		{/if}
	</div>
</Main>
