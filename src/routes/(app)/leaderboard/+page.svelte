<script lang="ts">
	import type { Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import type { PlayerLeaderboard } from '$types';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import Main from '$components/Main.svelte';
	import TopThree from '$components/TopThree.svelte';
	import { ArrowCircleRight } from 'phosphor-svelte';

	type PageProps = {
		players: Array<Player>;
		tournament: Tournament;
		leaderboard: Array<PlayerLeaderboard>;
	};

	export let data: PageData;

	const { tournament, players, leaderboard }: PageProps = data;
</script>

<Main className="user-page">
	<div class="leaderboard">
		<h1 class="title">Classifica</h1>

		<TopThree {leaderboard} />

		<div class="leaderboard-wrapper full-bleed">
			<ul>
				{#each leaderboard as player, index}
					<li>
						<a href={`/player/${player.playerId}`}>
							<span>{index + 1}</span>
							<Avatar name={player.name} picture={player.picture} />
							<strong>{player.name}</strong>
							<span class="points">{player.sumPoints} punti</span>
							<ArrowCircleRight size="20" class="arrow" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Main>

<style lang="scss">
	@import '../../../styles/shared';

	.leaderboard {
		display: flex;
		flex-direction: column;
	}

	.leaderboard-wrapper {
		@include layout-grid;

		& {
			min-height: auto;
			padding: 1rem 0;
			border-radius: var(--global-radius);
			/* background-color: var(--color-light-gray); */
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
		}

		li {
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
		}
	}

	.title {
		display: block;
		margin: 1.5rem 0 2rem 0;
		font-size: var(--text-scale-20);
		text-align: center;
		text-transform: uppercase;
	}
</style>
