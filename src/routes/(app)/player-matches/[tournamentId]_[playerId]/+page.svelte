<script lang="ts">
	/**
	 * Display all the matches of the player
	 */
	import type { PageData } from './$types';
	import type { PlayerMatches, PlayerStats } from '$lib/server/repository';
	import Main from '$components/Main.svelte';
	import type { Player, Tournament } from '@prisma/client';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import PlayerProfile from '$components/PlayerProfile.svelte';
	import { LayerCake, Svg } from 'layercake';
	import AxisX from '$components/chart/AxisX.svelte';
	import AxisY from '$components/chart/AxisY.svelte';
	import Area from '$components/chart/Area.svelte';
	import Line from '$components/chart/Line.svelte';
	import { ArrowCircleRight } from 'phosphor-svelte';

	type PageProps = {
		tournament: Tournament
		// matches: Array<PlayerMatches>
		stats: PlayerStats
		player: Player
	};

	export let data: PageData;

	const { stats, player, tournament }: PageProps = data;
	const points = stats.matchesDatesAndPoints.map(m => {
		return {
			x: m.date,
			y: m.points
		};
	});
</script>

<Main className="user-page">
	<div class="matches">
		<PageTitle title={`Profilo di ${player.name}`} showBackButton={true} />

		<PlayerProfile player={player} stats={stats} />

		<div class="chart">
			<LayerCake
				padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
				x="x"
				y="y"
				yDomain={[0, null]}
				data={points}
			>
				<Svg>
					<AxisX ticks={4} format={d => `${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(d)}`} />
					<AxisY ticks={4} />
					<Line stroke="#fff" />
					<Area fill="#1a479550" />
				</Svg>
			</LayerCake>
		</div>

		<h2>Partite:</h2>
		<ul>
			{#each stats.matchesDatesAndPoints as match}
				<li>
					<a href={`/matches/${tournament.id}/${match.matchId}`}>
						<span>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</span>
						<span class="points">{pluralizePoints(match.points)}</span>
						<ArrowCircleRight size="20" class="arrow" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Main>

<style lang="scss">
  .matches {
    display: flex;
    flex-direction: column;
    justify-items: center;

    h2 {
      margin-top: 0;
    }

    ul, li {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;

      @media (min-width: 64em) {
        max-width: 60vw;
      }
    }

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      border: 0;
      border-radius: var(--global-radius);
      background-color: var(--color-white);
      text-decoration: none;
      color: var(--color-dark);

      span:not(.points) {
        flex: 1 1 auto;
        margin-right: 1rem;
      }

      span.points {
        flex: 0 0 auto;
        text-align: right;
      }

      :global(.arrow) {
        margin-left: 0.5rem;
      }
    }
  }

  .chart {
    display: flex;
    width: 100%;
    height: 200px;
    margin-bottom: 3rem;
  }
</style>
