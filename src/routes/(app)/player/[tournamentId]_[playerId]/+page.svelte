<script lang="ts">
	/**
	 * Display all the matches of the player
	 */
	import type { PlayerStats } from '$lib/server/repository';
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
	import { ChevronRight } from 'lucide-svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let { stats, player, tournament } = data;

	let points: Array<{ x: Date, y: number }> = $state([]);
	console.log({ stats, player, tournament });

	$effect(() => {
		points = stats.matchesDatesAndPoints.map((m) => {
			return {
				x: m.date,
				y: m.points
			};
		});
	});
</script>

<Main className="user-page">
	<div class="matches flex flex-col">
		<PageTitle
			title={`Profilo di ${player.name}`}
			showBackButton={true}
		/>

		<PlayerProfile {player} {stats} />

		<Card class="chart mb-12 h-50 w-full">
			<CardContent>
				<div class="chart">
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
							<Area fill="#1a479550" />
						</Svg>
					</LayerCake>
				</div>
			</CardContent>
		</Card>

		<div class="matches-wrapper mx-auto w-full max-w-3xl">
			<h2 class="h-20 w-full text-center text-2xl">
				Partite giocate: {stats.matchesDatesAndPoints.length}
			</h2>

			<ul class="flex flex-col gap-5">
				{#each stats.matchesDatesAndPoints as match}
					<li class="h-12">
						<Button
							href={`/matches/${tournament.id}/${match.matchId}`}
							variant="secondary"
							class="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
						>
							<span>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</span>
							<span class="points">{pluralizePoints(match.points)}</span>
							<ChevronRight size="24" />
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Main>
