<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import TopThree from '#components/TopThree.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { cn } from '#lib/utils.ts';
	import type { PlayerLeaderboardWithNormalizedRanking } from '#types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { tournament, leaderboardByMatchPoints, leaderboardByTerritoriesPoints } =
		$derived(data);

	type ViewMode = 'territories' | 'match';
	let viewMode = $state<ViewMode>('territories');

	const views: Array<{ value: ViewMode; label: string }> = [
		{ value: 'territories', label: 'Punti territori' },
		{ value: 'match', label: 'Punti partita' },
	];

	let leaderboard = $derived(
		viewMode === 'territories'
			? leaderboardByTerritoriesPoints
			: leaderboardByMatchPoints,
	);

	const score = (player: PlayerLeaderboardWithNormalizedRanking) =>
		viewMode === 'territories' ? player.sumTerritoriesPoints : player.sumPoints;
</script>

<PageTitle title="Classifica" subtitle={tournament.title} />

<Main>
	<div
		class="mx-auto mb-8 grid w-full max-w-sm grid-cols-2 gap-1 rounded-full border bg-card/90 p-1"
		role="group"
		aria-label="Tipo di classifica"
	>
		{#each views as view (view.value)}
			<button
				type="button"
				aria-pressed={viewMode === view.value}
				class={cn(
					'h-10 cursor-pointer rounded-full px-3 text-sm font-medium transition-colors',
					viewMode === view.value
						? 'bg-primary text-primary-foreground shadow-sm'
						: 'text-muted-foreground hover:text-foreground',
				)}
				onclick={() => (viewMode = view.value)}
			>
				{view.label}
			</button>
		{/each}
	</div>

	{#if leaderboard.length > 0}
		<TopThree {leaderboard} tournamentId={tournament.id} {score} />

		<div class="mx-auto w-full max-w-xl">
			<ol class="panel divide-y">
				{#each leaderboard as player (player.playerId)}
					<li>
						<a
							href={`/player/${tournament.id}_${player.playerId}`}
							class="panel-row"
						>
							<span
								class={cn(
									'w-6 shrink-0 text-center font-semibold tabular-nums',
									player.rank > 3 && 'text-muted-foreground',
								)}
							>
								<span class="sr-only">Posizione </span>{player.rank}
							</span>
							<PlayerAvatar name={player.name} picture={player.picture} />
							<strong class="min-w-0 flex-1 truncate text-base"
								>{player.name}</strong
							>
							<span class="shrink-0 text-sm text-muted-foreground">
								<strong class="text-base text-foreground tabular-nums"
									>{score(player)}</strong
								>
								pt
							</span>
							<ChevronRight
								size={20}
								class="shrink-0 text-muted-foreground"
								aria-hidden="true"
							/>
						</a>
					</li>
				{/each}
			</ol>

			<Button
				href={`/matches/${tournament.id}`}
				variant="outline"
				size="lg"
				class="mt-6 h-12 w-full rounded-full"
			>
				Visualizza tutte le partite
			</Button>
		</div>
	{:else}
		<p
			class="panel mx-auto w-full max-w-xl px-6 py-12 text-center text-lg text-muted-foreground"
		>
			Non ci sono ancora partite!
		</p>
	{/if}
</Main>
