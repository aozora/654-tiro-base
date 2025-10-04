import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Player } from '@/lib/database/schema';
import type { PlayerStats } from '@/lib/repository';
import { cn } from '@/lib/utils';

type PlayerProfileProps = {
	player: Player;
	stats: PlayerStats;
};

export default function PlayerProfile({ player, stats }: PlayerProfileProps) {
	return (
		<header className="player-profile mb-8 flex items-center justify-center gap-4">
			<Avatar className={cn('h-32 w-32 border-4 border-foreground')}>
				<AvatarImage src={player.picture ?? undefined} />
				<AvatarFallback>{player.name[0] + player.name[1]}</AvatarFallback>
			</Avatar>

			<div className="players-stats">
				<ul className="flex flex-col gap-2">
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
	);
}
