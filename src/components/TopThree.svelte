<script lang="ts">
	import type { PlayerLeaderboard } from '$types';
	import TopAvatar from '$components/TopAvatar.svelte';

	export let leaderboard: Array<PlayerLeaderboard>;

	const first = leaderboard[0];
	const second = leaderboard[1];
	const third = leaderboard[2];
</script>

<section class="top-three">
	<TopAvatar name={first.name} picture={first.picture} index={0} size={80} />
	<TopAvatar name={second.name} picture={second.picture} index={1} size={80} />
	<TopAvatar name={third.name} picture={third.picture} index={2} size={80} />
</section>

<style lang="scss">
	.top-three {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		justify-items: center;
		gap: 1rem;
		margin: 3rem 0;

		:global(.avatar:nth-child(1)) {
			grid-column: 2;
			grid-row: 1;
		}

		:global(.avatar:nth-child(2)) {
			grid-column: 1;
			grid-row: 1;
			margin-top: 40px;
		}

		:global(.avatar:nth-child(3)) {
			grid-column: 3;
			grid-row: 1;
			margin-top: 40px;
		}
	}
</style>
