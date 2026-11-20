<script lang="ts">
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import { cn } from '#lib/utils.ts';
	import type { LeaderboardEntry } from '#types';

	type TopThreeProps = {
		leaderboard: Array<LeaderboardEntry>;
		tournamentId: string;
		/** Which score is shown under each name. */
		score: (player: LeaderboardEntry) => string;
	};

	let { leaderboard, tournamentId, score }: TopThreeProps = $props();

	// Podium order: second, first, third
	const podium = $derived(
		[
			{ player: leaderboard[1], place: 2 },
			{ player: leaderboard[0], place: 1 },
			{ player: leaderboard[2], place: 3 },
		].filter((entry) => entry.player !== undefined),
	);

	const border: Record<number, string> = {
		1: 'border-amber-400',
		2: 'border-slate-300',
		3: 'border-orange-700',
	};

	const badge: Record<number, string> = {
		1: 'bg-amber-400 text-black',
		2: 'bg-slate-300 text-black',
		3: 'bg-orange-700 text-white',
	};
</script>

<section class="mx-auto mb-8 w-full max-w-xl" aria-label="Podio">
	<ol class="grid grid-cols-3 items-end gap-2">
		{#each podium as { player, place } (player.playerId)}
			<li
				class={cn(
					'row-start-1 min-w-0',
					place === 1 && 'col-start-2',
					place === 2 && 'col-start-1 pt-8',
					place === 3 && 'col-start-3 pt-8',
				)}
			>
				<a
					href={`/player/${tournamentId}_${player.playerId}`}
					class="group flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-center outline-offset-2 focus-visible:outline-2"
				>
					<span class="relative flex">
						<PlayerAvatar
							name={player.name}
							picture={player.picture}
							size={place === 1 ? 128 : 96}
							eager
							class={cn(
								'border-4 text-lg transition-transform group-hover:scale-105',
								border[place],
								place === 1 ? 'size-24 sm:size-32' : 'size-18 sm:size-24',
							)}
						/>
						<span
							class={cn(
								'absolute -bottom-2 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold ring-2 ring-background',
								badge[place],
							)}
						>
							<span class="sr-only">Posizione </span>{player.rank}
						</span>
					</span>
					<strong class="mt-2 max-w-full truncate text-base sm:text-lg"
						>{player.name}</strong
					>
					<span class="text-sm text-muted-foreground tabular-nums">
						{score(player)} pt
					</span>
				</a>
			</li>
		{/each}
	</ol>
</section>
