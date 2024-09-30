<script lang="ts">
	import type { Match } from '@prisma/client';
	import type { PageData } from './$types';
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { ArrowCircleRight } from 'phosphor-svelte';

	type PageProps = {
		matches: Array<Match>
	};

	export let data: PageData;

	const { matches }: PageProps = data;
</script>

<Main className="user-page">
	<div class="matches">
		<PageTitle title={`Partite di`} />


		<ul>
			{#each matches as match}
				<li>
					<a href={`/`}>
						<strong>{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}</strong>
						<ArrowCircleRight size="20" class="arrow" />
					</a>
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
