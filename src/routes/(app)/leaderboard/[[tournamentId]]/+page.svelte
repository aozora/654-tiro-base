<script lang="ts">
	import type { Tournament } from '$lib/server/db';
	import type { PageData } from './$types';
	import type { PlayerLeaderboardWithNormalizedRanking } from '$types';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import Main from '$components/Main.svelte';
	import TopThree from '$components/TopThree.svelte';
	import { ArrowCircleRight } from 'phosphor-svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';

	type PageProps = {
		// players: Array<Player>;
		tournament: Tournament;
		leaderboard: Array<PlayerLeaderboardWithNormalizedRanking>;
	};

	export let data: PageData;

	const { tournament, leaderboard }: PageProps = data;
</script>

<Main className="user-page">
	<div class="leaderboard">
		<PageTitle title="Classifica" />

		<TopThree {leaderboard} />

		<div class="leaderboard-wrapper full-bleed">
			<ul>
				{#each leaderboard as player}
					<li>
						<a href={`/player-matches/${tournament.id}_${player.playerId}`}>
							<span>{player.rank}</span>
							<Avatar name={player.name} picture={player.picture} />
							<strong>{player.name}</strong>
							<span class="points">{pluralizePoints(player.sumPoints)}</span>
							<ArrowCircleRight size="20" class="arrow" />
						</a>
					</li>
				{/each}
			</ul>

			<a href={`/matches/${tournament.id}`} class="button">
				<span>Tutte le partite</span>
				<Icon id={Icons.TankBrand} />
			</a>
		</div>
	</div>
</Main>

<style lang="scss">
	@import '../../../../styles/shared';

	.leaderboard {
		display: flex;
		flex-direction: column;
	}

	.leaderboard-wrapper {
		@include layout-grid;

		& {
			justify-items: center;
			min-height: auto;
			padding: 1rem 0;
			border-radius: var(--global-radius);
		}

		> * {
			grid-column: 2;
		}

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

			@media (min-width: 64em) {
				max-width: 60vw;
			}
		}

		li {
			width: 100%;
		}

		a:not(.button) {
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
			transition: all 0.35s ease-in-out;

			span:not(.points) {
				flex: 0;
				margin-right: 1rem;
			}

			strong {
				flex: 1 1 auto;
				text-align: left;
			}

			:global(.avatar) {
				margin-right: 1rem;
			}

			:global(.arrow) {
				margin-left: 0.5rem;
			}

			&:hover,
			&:focus-visible {
				background-color: var(--color-brand);
				color: var(--color-white);
			}
		}

		.button {
			margin: 2rem 0 0 0;
		}
	}
</style>
