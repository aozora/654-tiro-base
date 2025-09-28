import { useMediaQuery } from '@react-hookz/web';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PlayerLeaderboard } from '@/lib/types';
import { cn } from '@/lib/utils';

type TopAvatarProps = {
	player: PlayerLeaderboard;
	index: number;
};

export default function TopAvatar({ player, index }: TopAvatarProps) {
	const isMobile = useMediaQuery('only screen and (max-width : 768px)');

	return (
		<div
			className={cn(
				'relative',
				index === 0 && 'col-2 row-1',
				index === 1 && 'col-1 row-1 mt-10 md:mt-20',
				index === 2 && 'col-3 row-1 mt-10 md:mt-20',
			)}
		>
			<Avatar
				className={cn(
					'border-4 border-foreground',
					isMobile ? 'h-20 w-20' : 'h-37 w-37',
				)}
			>
				<AvatarImage src={player.picture} />
				<AvatarFallback>{player.name[0] + player.name[1]}</AvatarFallback>
			</Avatar>

			<div
				className={cn(
					'-translate-1/2 absolute left-[50%] flex flex-col items-center justify-center gap-4',
					index === 0 ? 'top-[74%]' : 'top-[115%]',
				)}
			>
				<div
					className={cn(
						'flex h-5 w-5 items-center justify-center rounded-full bg-[#c7f064] text-center font-bold text-2xl text-black md:h-10 md:w-10',
					)}
				>
					{index + 1}
				</div>
				<strong className="text-2xl">{player.name}</strong>
			</div>
		</div>
	);
}
