<script lang="ts">
	import type { Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import type { PlayerLeaderboard } from '$types';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';

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

<h1>Leaderboard</h1>


<div class="leaderboard-wrapper">
	<ul>
		{#each leaderboard as player, index}
			<li>
				<span>{index + 1}</span>
				<Avatar name={player.name} picture={player.picture} />
				<strong>{player.name}</strong>
				<span>{player.sumPoints}</span>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
  .leaderboard-wrapper {
    ul, li {
      list-style-type: none;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
