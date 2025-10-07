<script lang="ts">
	import type { PlayerStats } from '$lib/server/repository';
	import type { Player } from '$lib/server/database/schema';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { cn } from '$lib/utils';

	type PlayerProfileProps = {
		player: Player;
		stats: PlayerStats;
	};

	let { player, stats }: PlayerProfileProps = $props();
</script>

<header class="player-profile mb-8 flex items-center justify-center gap-4">
	<Avatar class={cn('h-32 w-32 border-4 border-foreground')}>
		<AvatarImage src={player.picture ?? undefined} />
		<AvatarFallback>{player.name[0] + player.name[1]}</AvatarFallback>
	</Avatar>

	<div class="players-stats">
		<ul class="flex flex-col gap-2">
			<li>Partite giocate: {stats.matchesPlayedCount}</li>
			<li>Partite vinte: {stats.matchesWonCount}</li>
			<li>
				% di vincita:{' '}
				{Math.round(
					(stats.matchesWonCount / stats.matchesPlayedCount) * 100,
				)}
				%
			</li>
		</ul>
	</div>
</header>
