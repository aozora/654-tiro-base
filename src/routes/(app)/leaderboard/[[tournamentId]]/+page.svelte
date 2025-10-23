<script lang="ts">
	import Main from '$components/Main.svelte';
	import TopThree from '$components/TopThree.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { ChevronRight } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { tournament, leaderboard } = data;
</script>

<Main className="flex flex-col pb-10">
	<PageTitle title="Classifica" />

	{#if leaderboard.length > 0}
		<TopThree {leaderboard} />
	{/if}

	<div class="leaderboard-wrapper mx-auto w-full max-w-xl">
		<ul class="flex flex-col gap-5">
			{#each leaderboard as player}
				<li class="h-12">
					<Button
						href={`/player/${tournament.id}_${player.playerId}`}
						variant="secondary"
						class="flex items-center justify-between gap-4 h-12 w-full bg-indigo-500 hover:bg-indigo-700"
					>
						<div class="flex-1 flex items-center gap-2">
							<span>{player.rank}</span>
							<Avatar class="h-6 w-6">
								<AvatarImage src={player.picture} />
								<AvatarFallback>
									{player.name[0] + player.name[1]}
								</AvatarFallback>
							</Avatar>
							<strong>{player.name}</strong>
						</div>
						<span>{pluralizePoints(player.sumPoints)}</span>
						<ChevronRight size={24} />
					</Button>
				</li>
			{/each}
		</ul>

		{#if leaderboard.length === 0}
			<p class="text-center text-3xl">Non ci sono ancora partite!</p>
		{/if}

		{#if leaderboard.length > 0}
			<div class="mt-6 mb-10 flex w-full items-center justify-center">
				<Button href={`/matches/${tournament.id}`} class="mx-auto">
					<span>Visualizza tutte le partite</span>
				</Button>
			</div>
		{/if}
	</div>
</Main>
