import TopAvatar from '@/components/TopAvatar';
import type { PlayerLeaderboard } from '@/lib/types';

type TopThreeProps = {
	leaderboard: Array<PlayerLeaderboard>;
};

export default function TopThree({ leaderboard }: TopThreeProps) {
	return (
		<section className="top-three mx-auto my-12 grid w-full grid-cols-3 justify-items-center gap-4 md:my-27 md:max-w-[60vw]">
			<TopAvatar player={leaderboard[0]} index={0} />
			<TopAvatar player={leaderboard[1]} index={1} />
			<TopAvatar player={leaderboard[2]} index={2} />
		</section>
	);
}
