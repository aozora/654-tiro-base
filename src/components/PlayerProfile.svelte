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

	const tiles = $derived([
		{ label: 'Giocate', value: String(stats.matchesPlayedCount) },
		{ label: 'Vinte', value: String(stats.matchesWonCount) },
		{ label: 'Vittorie', value: `${winRate}%` },
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
			<div class="panel flex flex-col-reverse items-center gap-3 px-2 py-5">
				<dt class="text-xs tracking-wide text-muted-foreground uppercase">
					{tile.label}
				</dt>
				<dd class="text-3xl font-semibold tabular-nums">{tile.value}</dd>
			</div>
		{/each}
	</dl>
</header>
