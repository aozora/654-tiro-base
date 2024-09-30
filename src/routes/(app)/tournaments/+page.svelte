<script lang="ts">
	import type { Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { ArrowCircleRight } from 'phosphor-svelte';

	type PageProps = {
		tournaments: Array<Tournament>;
	};

	export let data: PageData;

	const { tournaments }: PageProps = data;

	const activeTournament = tournaments.find(t => t.isActive);
	const otherTournaments = tournaments.filter(t => t.id !== activeTournament?.id);
</script>

<Main className="user-page">
	<div class="tournaments">
		<PageTitle title="Tornei" />

		<h2>Torneo attuale:</h2>

		{#if activeTournament}
			<ul>
				<li>
					<a href={`/leaderboard/${activeTournament.id}`}>
						<strong>{activeTournament.title}</strong>
						<ArrowCircleRight size="20" class="arrow" />
					</a>
				</li>
			</ul>
		{:else }
			<p>Non c'è un torneo attivo</p>
		{/if}


		<h2>Tornei precedenti:</h2>
		{#if otherTournaments && otherTournaments.length > 0}
			<ul>
				{#each otherTournaments as t}
					<li>
						<a href={`/leaderboard/${t.id}`}>
							<strong>{t.title}</strong>
							<ArrowCircleRight size="20" class="arrow" />
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>Non ci sono altri tornei.</p>
		{/if}
	</div>
</Main>

<style lang="scss">
  .tournaments {
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

      span {
        flex: 0;
        margin-right: 1rem;
      }

      strong {
        flex: 1 1 auto;
        text-align: left;
      }

      :global(.arrow) {
        margin-left: 0.5rem;
      }
    }
  }
</style>
