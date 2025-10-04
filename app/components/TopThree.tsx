import TopAvatar from '@/components/TopAvatar';
import type { PlayerLeaderboard } from '@/lib/types';
import { cn } from '@/lib/utils';

type TopThreeProps = {
	leaderboard: Array<PlayerLeaderboard>;
};

export default function TopThree({ leaderboard }: TopThreeProps) {
	return (
		<section
			className={cn(
				'top-three w-full md:mx-auto',
				'min-h-42 md:min-h-48',
				'mt-0 mb-12',
				'md:mt-8 md:mb-27 md:max-w-[60vw]',
			)}
		>
			<div className="grid w-full grid-cols-3 justify-items-center gap-4">
				<TopAvatar player={leaderboard[0]} index={0} />
				<TopAvatar player={leaderboard[1]} index={1} />
				<TopAvatar player={leaderboard[2]} index={2} />
			</div>
		</section>
	);
}
