<script lang="ts">
	/**
	 * Display all the matches of the player
	 */
	import type { PageData } from './$types';
	import Main from '../../../../../components/Main.svelte';
	import type { Match, Tournament } from '../../../../../lib/server/db';
	import PageTitle from '../../../../../components/PageTitle.svelte';
	import { pluralizePoints } from '../../../../../lib/helpers';
	import type { PlayerLeaderboardWithNormalizedRanking } from '../../../../../types';

	type PageProps = {
		tournament: Tournament;
		match: Match;
		matchPlayers: Array<PlayerLeaderboardWithNormalizedRanking>;
	};

	export let data: PageData;

	const { match, matchPlayers }: PageProps = data;
</script>

<Main className="user-page">
	<div class="matches">
		<PageTitle
			title={`Partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
			showBackButton={true}
		/>

		<ul>
			{#each matchPlayers as player}
				<li>
					<span>{player.rank}</span>
					<span>{player.name}</span>
					<span class="points">{pluralizePoints(player.sumPoints)}</span>
				</li>
			{/each}
		</ul>
	</div>
</Main>

<style lang="scss">
	.matches {
		display: flex;
		flex-direction: column;

		ul,
		li {
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
</style>
