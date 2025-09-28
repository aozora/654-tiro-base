import { CircleArrowRight } from 'lucide-react';
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
					<li key={player.playerId}>
						<Button asChild variant="outline" className="h-12 w-full">
							<Link
								prefetch="none"
								to={`/player-matches/${tournament.id}_${player.playerId}`}
								className=""
							>
								<span>{player.rank}</span>

								<Avatar>
									<AvatarImage src={player.picture} />
									<AvatarFallback>
										{player.name[0] + player.name[1]}
									</AvatarFallback>
								</Avatar>
								<strong>{player.name}</strong>
								<span className="points">
									{pluralizePoints(player.sumPoints)}
								</span>
								<CircleArrowRight size={20} />
							</Link>
						</Button>
					</li>
				))}
			</ul>

			<Button asChild className="mx-auto">
				<Link to={`/matches/${tournament.id}`}>
					<span>Tutte le partite</span>
					<Icon id={Icons.TankBrand} className="h-6 w-6" />
				</Link>
			</Button>
		</div>
	);
}
