<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import { LayerCake, Svg } from 'layercake';
	import Area from '#components/chart/Area.svelte';
	import AxisX from '#components/chart/AxisX.svelte';
	import AxisY from '#components/chart/AxisY.svelte';
	import Line from '#components/chart/Line.svelte';
	/**
	 * Display all the matches of the player
	 */
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import PlayerProfile from '#components/PlayerProfile.svelte';
	import { formatDate } from '#lib/helpers.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { stats, player, tournament } = $derived(data);

	let points = $derived(
		stats.matchesDatesAndPoints.map((m) => ({ x: m.date, y: m.points })),
	);
</script>

<PageTitle
	title={player.name}
	subtitle={tournament.title}
	showBackButton={true}
/>

<Main>
	<div class="mx-auto flex w-full max-w-xl flex-col">
		<PlayerProfile {player} {stats} />

		<!-- A trend needs at least two matches -->
		{#if points.length > 1}
			<section class="panel mb-8 px-4 pt-5 pb-4" aria-labelledby="trend-title">
				<h2
					id="trend-title"
					class="mb-3 text-sm font-medium text-muted-foreground"
				>
					Andamento punti partita
				</h2>
				<div class="h-48 w-full pb-6">
					<LayerCake
						padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
						x="x"
						y="y"
						yDomain={[0, null]}
						data={points}
					>
						<Svg>
							<AxisX ticks={4} format={(d) => formatDate(d)} />
							<AxisY ticks={4} />
							<Line stroke="var(--primary)" />
							<Area
								fill="color-mix(in oklab, var(--primary) 18%, transparent)"
							/>
						</Svg>
					</LayerCake>
				</div>
			</section>
		{/if}

		<h2 class="mb-4 px-1 text-sm font-medium text-muted-foreground">
			Partite giocate: {stats.matchesDatesAndPoints.length}
		</h2>

		{#if stats.matchesDatesAndPoints.length > 0}
			<ul class="panel divide-y">
				{#each stats.matchesDatesAndPoints as match (match.matchId)}
					<li>
						<a
							href={`/matches/${tournament.id}/${match.matchId}`}
							class="panel-row"
						>
							<strong class="min-w-0 flex-1 text-base"
								>{formatDate(match.date, 'long')}</strong
							>
							<span
								class="flex shrink-0 flex-col items-end text-sm leading-tight text-muted-foreground"
							>
								<span>
									<strong class="text-base text-foreground tabular-nums"
										>{match.points}</strong
									>
									pt
								</span>
								<span class="text-xs tabular-nums"
									>{match.territoriesPoints} territori</span
								>
							</span>
							<ChevronRight
								size={20}
								class="shrink-0 text-muted-foreground"
								aria-hidden="true"
							/>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="panel px-6 py-12 text-center text-lg text-muted-foreground">
				Nessuna partita giocata in questo torneo.
			</p>
		{/if}
	</div>
</Main>
