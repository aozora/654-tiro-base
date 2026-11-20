<script lang="ts">
	import PlayerAvatar from '#components/PlayerAvatar.svelte';
	import type { Player } from '#lib/server/database/schema.ts';

	type Props = {
		player: Player;
	};

	let { player }: Props = $props();
</script>

<div class="flex min-w-0 items-center gap-3">
	<PlayerAvatar
		name={player.name}
		picture={player.picture}
		size={32}
		class="size-8"
	/>
	<strong class="truncate">{player.name}</strong>
</div>
