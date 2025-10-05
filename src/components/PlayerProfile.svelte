<script lang="ts">
	import type { Player } from '$lib/server/db';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import type { PlayerStats } from '$lib/server/repository';

	export let player: Player;
	export let stats: PlayerStats;
</script>

<header class="player-profile">
	<Avatar
		picture={player.picture || ''}
		name={player.name}
		size={120}
		className="player-profile-avatar"
	/>

	<div class="players-stats">
		<ul>
			<li>Partite giocate: {stats.matchesPlayedCount}</li>
			<li>Partite vinte: {stats.matchesWonCount}</li>
			<li>% di vincita: {Math.round((stats.matchesWonCount / stats.matchesPlayedCount) * 100)}%</li>
		</ul>
	</div>
</header>

<style lang="scss">
	.player-profile {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		justify-items: center;
		gap: 1rem;
		margin: 0 0 2rem 0;
	}

	:global(.player-profile-avatar) {
		grid-column: 1/2;
	}

	.players-stats {
		grid-column: 2/3;

		ul,
		li {
			margin: 0;
			padding: 0;
			list-style-type: none;
		}
	}
</style>
