<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import TopThree from '#components/TopThree.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import * as Tabs from '#lib/components/ui/tabs/index.ts';
	import { cn } from '#lib/utils.ts';
	import type { LeaderboardEntry } from '#types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let {
		tournament,
		leaderboardByMatchPoints,
		leaderboardByTerritoriesPoints,
		leaderboardByAverage,
	} = $derived(data);

	type View = {
		value: string;
		label: string;
		leaderboard: Array<LeaderboardEntry>;
		/** The score the view is ranked by, ready to display. */
		score: (player: LeaderboardEntry) => string;
		/** Extra context shown under the score. */
		detail?: (player: LeaderboardEntry) => string;
	};

	const averageFormat = new Intl.NumberFormat('it', {
		maximumFractionDigits: 2,
	});

	let viewMode = $state('territories');

	const views: Array<View> = $derived([
		{
			value: 'territories',
			label: 'Punti territori',
			leaderboard: leaderboardByTerritoriesPoints,
			score: (player) => String(player.sumTerritoriesPoints),
		},
		{
			value: 'match',
			label: 'Punti partita',
			leaderboard: leaderboardByMatchPoints,
			score: (player) => String(player.sumPoints),
		},
		{
			// Territory points divided by the matches the player took part in
			value: 'average',
			label: 'Media punti',
			leaderboard: leaderboardByAverage,
			score: (player) => averageFormat.format(player.averageTerritoriesPoints),
			detail: (player) =>
				player.matchesPlayed === 1
					? '1 partita'
					: `${player.matchesPlayed} partite`,
		},
	]);
</script>

<PageTitle title="Classifica" subtitle={tournament.title} />

<Main>
	<!-- Each tab shows the same players, ranked by a different score -->
	<Tabs.Root bind:value={viewMode} class="gap-8">
		<Tabs.List
			aria-label="Tipo di classifica"
			class="mx-auto w-full max-w-md rounded-lg border bg-card/90 p-1 group-data-horizontal/tabs:h-12"
		>
			{#each views as view (view.value)}
				<Tabs.Trigger
					value={view.value}
					class="h-full cursor-pointer rounded-md px-1 text-xs sm:text-sm data-active:bg-primary data-active:text-primary-foreground dark:data-active:border-transparent dark:data-active:bg-primary dark:data-active:text-primary-foreground"
				>
					{view.label}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>

		{#each views as view (view.value)}
			<Tabs.Content value={view.value}>
				{@render board(view)}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</Main>

{#snippet board({ leaderboard, score, detail }: View)}
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
							<span
								class="flex shrink-0 flex-col items-end text-sm leading-tight text-muted-foreground"
							>
								<span>
									<strong class="text-base text-foreground tabular-nums"
										>{score(player)}</strong
									>
									pt
								</span>
								{#if detail}
									<span class="text-xs tabular-nums">{detail(player)}</span>
								{/if}
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
				class="mt-6 h-12 w-full"
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
{/snippet}
