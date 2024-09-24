<script lang="ts">
	import type { Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import type { PlayerLeaderboard } from '$types';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import Main from '$components/Main.svelte';

	type PageProps = {
		players: Array<Player>
		tournament: Tournament
		leaderboard: Array<PlayerLeaderboard>
	}

	export let data: PageData;

	const {
		tournament,
		players,
		leaderboard
	}: PageProps = data;

	console.log({ tournament, players, leaderboard });
</script>

<Main className="user-page">
	<div>
		<h1>Leaderboard</h1>

		<div class="leaderboard-wrapper full-bleed">
			<ul>
				{#each leaderboard as player, index}
					<li>
						<button type="button">
							<span>{index + 1}</span>
							<Avatar name={player.name} picture={player.picture} />
							<strong>{player.name}</strong>
							<span class="points">{player.sumPoints} punti</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Main>

<style lang="scss">
  @import '../../../styles/shared';

  .leaderboard-wrapper {
    @include layout-grid;
    min-height: auto;
    padding: 1rem 0;
    border-radius: var(--global-radius);
    background-color: var(--color-light-gray);

    > * {
      grid-column: 2;
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
    }

    li {
      width: 100%;
    }

    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: .5rem;
      border: 0;
      border-radius: var(--global-radius);
      background-color: var(--color-white);

      span:not(.points) {
        flex: 0;
        margin-right: 1rem;
      }

      strong {
        flex: 1 1 auto;
				text-align: left;
      }

      span.points {
        //align-self: flex-end;
      }

      :global(.avatar) {
        margin-right: 1rem;
      }
    }
  }
</style>
