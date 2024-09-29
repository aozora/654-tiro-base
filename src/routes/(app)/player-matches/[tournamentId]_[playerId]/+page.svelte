<script lang="ts">/**
 * Display all the matches of the player
 */
import type { PageData } from './$types';
import type { PlayerMatches } from '$lib/server/repository';
import Main from '$components/Main.svelte';
import type { Player, Tournament } from '@prisma/client';
import PageTitle from '$components/PageTitle.svelte';
import { pluralizePoints } from '$lib/helpers';
import {
	LinkedChart,
	LinkedLabel,
	LinkedValue
} from 'svelte-tiny-linked-charts';

type PageProps = {
	tournament: Tournament
	matches: Array<PlayerMatches>
	player: Player
};

export let data: PageData;

const { matches, tournament, player }: PageProps = data;

const chartLabels = matches.map(m => `${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(m.date)}`);
const chartData = matches.map(m => m.points);
</script>

<Main className="user-page">
	<div class="matches">
		<PageTitle title={`Partite di ${player.name}`} showBackButton={true} />

		<div class="chart">
			<LinkedChart labels={chartLabels} data={chartData} scaleMin={0} grow/>
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
		margin-bottom: 2rem;
	}
</style>
