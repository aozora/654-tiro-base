<script lang="ts">
	import type { Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import type { PlayerLeaderboard } from '$types';

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

