<script lang="ts">
	/**
	 * Display all the matches of the player
	 */
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import PlayerProfile from '$components/PlayerProfile.svelte';
	import { LayerCake, Svg } from 'layercake';
	import AxisX from '$components/chart/AxisX.svelte';
	import AxisY from '$components/chart/AxisY.svelte';
	import Area from '$components/chart/Area.svelte';
	import Line from '$components/chart/Line.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { stats, player, tournament } = data;

	let points: Array<{ x: Date, y: number }> = $state([]);
	console.log({ stats, player, tournament });

	$effect(() => {
		points = stats ? stats.matchesDatesAndPoints.map((m) => {
			return {
				x: m.date,
				y: m.points
			};
		}) : [];
	});
</script>

<PageTitle
	title={`Profilo di ${player.name}`}
	showBackButton={true}
/>

<Main className="user-page">
	<div class="matches flex flex-col">
		{#if player && stats}
			<PlayerProfile {player} {stats} />
		{/if}

		<Card class="chart mb-12 w-full">
			<CardContent>
				<div class="chart h-50 pb-6 w-full">
					<LayerCake
						padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
						x="x"
						y="y"
						yDomain={[0, null]}
						data={points}
					>
						<Svg>
							<AxisX
								ticks={4}
								format={(d) => `${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(d)}`}
							/>
							<AxisY ticks={4} />
							<Line stroke="#fff" />
							<Area/>
						</Svg>
					</LayerCake>
				</div>
			</CardContent>
		</Card>

		<div class="matches-wrapper mx-auto w-full max-w-xl mb-10">
			<h2 class="h-20 w-full text-center text-2xl">
				Partite giocate: {stats?.matchesDatesAndPoints.length}
			</h2>

			<ul class="flex flex-col gap-5">
				{#if stats}
					{#each stats.matchesDatesAndPoints as match}
						<li class="h-12">
							<Button
								href={`/matches/${tournament.id}/${match.matchId}`}
								variant="secondary"
								class="h-12 w-full flex items-center justify-between bg-card hover:bg-indigo-700"
							>
								<span>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</span>
								<span class="">{pluralizePoints(match.points)}</span>
								<span class="">({pluralizePoints(match.territoriesPoints)} territori)</span>
								<ChevronRight size="24" />
							</Button>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</Main>
