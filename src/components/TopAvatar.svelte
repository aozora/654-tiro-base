<script lang="ts">
	import type { PlayerLeaderboard } from '$types';
	import { MediaQuery } from 'svelte/reactivity';
	import { cn } from '$lib/utils';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

	type Props = {
		player: PlayerLeaderboard;
		index: number;
	}

	let { player, index }: Props = $props();
	const isDesktop = new MediaQuery('min-width: 64em');
</script>

<div
	class={cn(
				'relative',
				index === 0 && 'col-2 row-1',
				index === 1 && 'col-1 row-1 mt-10 md:mt-20',
				index === 2 && 'col-3 row-1 mt-10 md:mt-20',
			)}
>
	<Avatar
		class={cn(
					'border-4 border-foreground',
					!isDesktop ? 'h-20 w-20' : 'h-37 w-37',
				)}
	>
		<AvatarImage src={player.picture} />
		<AvatarFallback>{player.name[0] + player.name[1]}</AvatarFallback>
	</Avatar>

	<div
		class={cn(
					'-translate-1/2 absolute left-[50%] flex flex-col items-center justify-center gap-4',
					index === 0 ? 'top-[74%]' : 'top-[115%]',
				)}
	>
		<div
			class={cn(
						'flex h-5 w-5 items-center justify-center rounded-full bg-[#c7f064] text-center font-bold text-black text-md md:h-10 md:w-10 md:text-2xl',
					)}
		>
			{index + 1}
		</div>
		<strong class="text-2xl">{player.name}</strong>
	</div>
</div>
