<script lang="ts">
	import type { PlayerLeaderboard } from '$types';
	import TopAvatar from '$components/TopAvatar.svelte';
	import { cn } from '$lib/utils';

	type TopThreeProps = {
		leaderboard: Array<PlayerLeaderboard>;
	};

	let { leaderboard }: TopThreeProps = $props();
</script>

<section
	class={cn(
				'top-three w-full md:mx-auto',
				'min-h-42 md:min-h-48',
				'mt-0 mb-12',
				'md:mt-8 md:mb-27 md:max-w-[60vw]',
			)}
>
	<div class="grid w-full grid-cols-3 justify-items-center gap-4">
		<TopAvatar player={leaderboard[0]} index={0} />
		<TopAvatar player={leaderboard[1]} index={1} />
		<TopAvatar player={leaderboard[2]} index={2} />
	</div>
</section>