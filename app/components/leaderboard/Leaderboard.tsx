import { ChevronRight, CircleArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Icon from '@/components/Icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Tournament } from '@/lib/database/schema';
import { pluralizePoints } from '@/lib/helpers';
import {
	Icons,
	type PlayerLeaderboardWithNormalizedRanking,
} from '@/lib/types';

type LeaderboardProps = {
	tournament: Tournament;
	leaderboard: Array<PlayerLeaderboardWithNormalizedRanking>;
};

export default function Leaderboard({
	tournament,
	leaderboard,
}: LeaderboardProps) {
	return (
		<div className="leaderboard-wrapper mx-auto w-full max-w-3xl">
			<ul className="flex flex-col gap-5">
				{leaderboard?.map((player) => (
					<li key={player.playerId} className="h-12">
						<Button
							asChild
							variant="secondary"
							className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
						>
							<Link
								prefetch="none"
								to={`/player/${tournament.id}/${player.playerId}`}
								className="flex items-center justify-between gap-4"
							>
								<span className="flex-0">{player.rank}</span>

								<Avatar className="h-6 w-6">
									<AvatarImage src={player.picture} />
									<AvatarFallback>
										{player.name[0] + player.name[1]}
									</AvatarFallback>
								</Avatar>
								<strong className="flex-1">{player.name}</strong>

								<span className="points flex-0">
									{pluralizePoints(player.sumPoints)}
								</span>
								<ChevronRight size={24} />
							</Link>
						</Button>
					</li>
				))}
			</ul>

			<div className="mt-6 mb-10 flex w-full items-center justify-center">
				<Button asChild className="mx-auto">
					<Link to={`/matches/${tournament.id}`}>
						<span>Visualizza tutte le partite</span>
						{/*<Icon id={Icons.TankBrand} className="h-5 w-11" />*/}
					</Link>
				</Button>
			</div>
		</div>
	);
}
