<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import { formatDate } from '#lib/helpers.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { matches, tournament } = $derived(data);
</script>

<PageTitle
	title="Cronologia partite"
	subtitle={matches.length === 1
		? '1 partita giocata'
		: `${matches.length} partite giocate`}
	showBackButton={true}
/>

<Main>
	<div class="mx-auto w-full max-w-xl">
		{#if matches.length > 0}
			<ol class="panel divide-y">
				{#each matches as match, index (match.id)}
					<li>
						<a href={`/matches/${tournament.id}/${match.id}`} class="panel-row">
							<span
								class="w-8 shrink-0 text-sm text-muted-foreground tabular-nums"
							>
								#{matches.length - index}
							</span>
							<strong class="min-w-0 flex-1 text-base"
								>{formatDate(match.date, 'long')}</strong
							>
							<ChevronRight
								size={20}
								class="shrink-0 text-muted-foreground"
								aria-hidden="true"
							/>
						</a>
					</li>
				{/each}
			</ol>
		{:else}
			<p class="panel px-6 py-12 text-center text-lg text-muted-foreground">
				Non ci sono ancora partite!
			</p>
		{/if}
	</div>
</Main>
