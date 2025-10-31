<script lang="ts">
	/**
	 * Display all the matches of the player
	 */
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import type { PageProps } from './$types';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { data }: PageProps = $props();

	const { match, matchPlayers } = data;
</script>

<PageTitle
	title={`Partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
	showBackButton={true}
/>

<Main className="user-page">
	<div class="matches">
		<div class="matches-wrapper mx-auto w-full max-w-lg">
			<ul class="flex flex-col gap-5">
				{#each matchPlayers as player}
					<li class="h-12">
						<div class={cn(
								buttonVariants({ variant: "default" }),
								"h-12 w-full flex items-center justify-between"
								)}>
							<span>{player.rank}</span>
							<span>{player.name}</span>
							<div class="flex gap-2">
								<span class="points">{pluralizePoints(player.sumPoints)}</span>
								<span class="points">({pluralizePoints(player.sumTerritoriesPoints)} territori)</span>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Main>
