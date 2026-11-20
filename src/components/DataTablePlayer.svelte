<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.ts';
	import type { Player } from '#lib/server/database/schema.ts';

	type Props = {
		player: Player;
	}

	let { player }: Props = $props();
</script>

<div class="flex items-center gap-2">
	<Avatar class="h-6 w-6">
		<AvatarImage src={player.picture} />
		<AvatarFallback>
			{player.name[0] + player.name[1]}
		</AvatarFallback>
	</Avatar>
	<strong>{player.name}</strong>
</div>
