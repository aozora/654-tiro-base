import { Link } from 'react-router';
import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
	const session = useSession();

	const closeOnClick = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<div
			className={cn(
				'mobile-menu fixed inset-0 z-100 h-full min-h-full w-full bg-secondary p-4',
				!isOpen && 'hidden',
			)}
		>
			<header className="flex items-center justify-center">
				<h1 className="text-foreground text-xl">Menu</h1>
			</header>
			<nav>
				<ul className="flex flex-col items-start justify-start gap-4">
					<li>
						<Link to="/leaderboard" onClick={() => closeOnClick()}>
							Classifica
						</Link>
					</li>
					<li>
						<Link to="/tournaments" onClick={() => closeOnClick()}>
							Tornei
						</Link>
					</li>

					{session?.data?.user && session?.data?.user.role === 'admin' && (
						<li>
							<Link to="/admin" onClick={() => closeOnClick()}>
								Amministrazione
							</Link>
						</li>
					)}

					<li className="logout">
						<form action="/logout" method="POST">
							<button type="submit">Esci</button>
						</form>
					</li>
				</ul>
			</nav>
		</div>
	);
}
