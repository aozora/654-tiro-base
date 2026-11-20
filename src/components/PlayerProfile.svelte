<script lang="ts">
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import type { Player } from '#lib/server/database/schema.ts';
	import type { PlayerStats } from '#lib/server/repository.ts';

	type PlayerProfileProps = {
		player: Player;
		stats: PlayerStats;
	};

	let { player, stats }: PlayerProfileProps = $props();

	const winRate = $derived(
		stats.matchesPlayedCount > 0
			? Math.round((stats.matchesWonCount / stats.matchesPlayedCount) * 100)
			: 0,
	);

	// Same formula as the "Media punti" leaderboard: territory points per match played
	const averageTerritoriesPoints = $derived(
		stats.matchesPlayedCount > 0
			? stats.matchesDatesAndPoints.reduce(
					(sum, match) => sum + match.territoriesPoints,
					0,
				) / stats.matchesPlayedCount
			: 0,
	);

	const averageFormat = new Intl.NumberFormat('it', {
		maximumFractionDigits: 2,
	});

	const tiles = $derived([
		{
			label: 'Vinte / giocate',
			value: `${stats.matchesWonCount}/${stats.matchesPlayedCount}`,
		},
		{ label: 'Vittorie', value: `${winRate}%` },
		{
			label: 'Media punti',
			value: averageFormat.format(averageTerritoriesPoints),
		},
	]);
</script>

<header class="mb-6 flex flex-col items-center gap-6">
	<PlayerAvatar
		name={player.name}
		picture={player.picture}
		size={112}
		eager
		class="size-28 border-4 border-foreground text-2xl"
	/>

	<dl class="grid w-full grid-cols-3 gap-2 sm:gap-4">
		{#each tiles as tile (tile.label)}
			<div
				class="panel flex flex-col-reverse items-center justify-end gap-1 px-2 py-4"
			>
				<dt
					class="text-center text-xs tracking-wide text-muted-foreground uppercase"
				>
					{tile.label}
				</dt>
				<dd class="text-2xl font-semibold tabular-nums sm:text-3xl">
					{tile.value}
				</dd>
			</div>
		{/each}
	</dl>
</header>
