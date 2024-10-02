<script lang="ts">/**
 * Display all the matches of the player
 */
import type { PageData } from './$types';
import type { PlayerMatches } from '$lib/server/repository';
import Main from '$components/Main.svelte';
import type { Player, Tournament } from '@prisma/client';
import PageTitle from '$components/PageTitle.svelte';
import { pluralizePoints } from '$lib/helpers';
import { Line } from 'svelte-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

import {
	LinkedChart
} from 'svelte-tiny-linked-charts';

type PageProps = {
	tournament: Tournament
	matches: Array<PlayerMatches>
	player: Player
};

export let data: PageData;

const { matches, player }: PageProps = data;

const chartLabels = matches.map(m => `${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(m.date)}`);
const chartData = matches.map(m => m.points);
</script>

<Main className="user-page">
	<div class="matches">
		<PageTitle title={`Partite di ${player.name}`} showBackButton={true} />

		<div class="chart">
			<Line
				data={{
					labels: chartLabels,
					datasets: [{
						label: 'Andamento',
						fill: true,
						backgroundColor: 'rgb(217,217,217)',
						borderColor: 'rgb(250,250,250)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgb(230,121,90)',
						pointBackgroundColor: 'rgb(255, 255, 255)',
						pointBorderWidth: 10,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgb(0, 0, 0)',
						pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: chartData
					}]
				}}
				width="100vw"
				height={150}
				options={{ responsive: true, maintainAspectRatio: false }}
			/>
			<!--			<LinkedChart labels={chartLabels}-->
			<!--									 data={chartData}-->
			<!--									 type="line"-->
			<!--									 showValue-->
			<!--									 valueDefault=""-->
			<!--									 valueAppend=" punti"-->
			<!--									 valuePosition="floating"-->
			<!--									 scaleMin={0}-->
			<!--									 barMinWidth={0}-->
			<!--									 barMinHeight={5}-->
			<!--									 grow />-->
		</div>

		<ul>
			{#each matches as match}
				<li>
					<span>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</span>
					<span class="points">{pluralizePoints(match.points)}</span>
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
    }
  }

  .chart {
    margin-bottom: 3rem;

    //:global(svg) {
    //  width: 100%;
    //  height: auto;
    //}
  }
</style>
