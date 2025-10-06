<script lang="ts">
	import type { PageData } from './$types';
	import type { PlayerLeaderboardWithNormalizedRanking } from '$types';
	import Main from '$components/Main.svelte';
	import TopThree from '$components/TopThree.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import { pluralizePoints } from '$lib/helpers';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import type { Tournament } from '$lib/server/database/schema';
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { ChevronRight } from 'lucide-svelte';

	type PageProps = {
		tournament: Tournament;
		leaderboard: Array<PlayerLeaderboardWithNormalizedRanking>;
	};

	export let data: PageData;

	const { tournament, leaderboard }: PageProps = data;
</script>

<Main className="flex flex-col pb-10">
	<PageTitle title="Classifica" />

	<TopThree {leaderboard} />

	<div class="leaderboard-wrapper mx-auto w-full max-w-3xl">
		<ul class="flex flex-col gap-5">
			{#each leaderboard as player}
				<li class="h-12">
					<Button
						href={`/player/${tournament.id}/${player.playerId}`}
						variant="secondary"
						class="flex items-center justify-between gap-4 h-12 w-full bg-indigo-500 hover:bg-indigo-700"
					>
						<span>{player.rank}</span>
						<Avatar class="h-6 w-6">
							<AvatarImage src={player.picture} />
							<AvatarFallback>
								{player.name[0] + player.name[1]}
							</AvatarFallback>
						</Avatar>
						<strong>{player.name}</strong>
						<span class="points">{pluralizePoints(player.sumPoints)}</span>
						<ChevronRight size={24} />
					</Button>
				</li>
			{/each}
		</ul>

		<div class="mt-6 mb-10 flex w-full items-center justify-center">
			<Button href={`/matches/${tournament.id}`} class="mx-auto">
					<span>Visualizza tutte le partite</span>
			</Button>
		</div>
	</div>

</Main>
