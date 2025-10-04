import { useMediaQuery } from '@react-hookz/web';
import { Dice6 } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import MobileMenu from '@/components/MobileMenu';
import { useSession } from '@/lib/auth-client';
import type { Tournament } from '@/lib/database/schema';

type HeaderProps = {
	tournament?: Tournament;
};

export default function Header({ tournament }: HeaderProps) {
	const isMobile = useMediaQuery('only screen and (max-width : 768px)');
	const session = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="header sticky top-0 z-10 flex h-16 items-center justify-between p-4 px-4">
			<NavLink to="/" className="logo font-brutal text-white text-xl">
				{tournament && <span>{tournament.title}</span>}
				{!tournament && <span>654 tiro base</span>}
			</NavLink>

			{!isMobile && (
				<nav className="menu flex-1">
					<ul className="flex items-center justify-end gap-4">
						<li>
							<NavLink
								to="/leaderboard"
								className="cursor-pointer text-base text-foreground transition hover:underline"
							>
								Classifica
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/tournaments"
								className="cursor-pointer text-base text-foreground transition hover:underline"
							>
								Tornei
							</NavLink>
						</li>

						{session?.data?.user && session.data.user.role === 'admin' && (
							<li>
								<NavLink
									to="/admin"
									className="cursor-pointer text-base text-foreground transition hover:underline"
								>
									Amministrazione
								</NavLink>
							</li>
						)}

						<li className="logout">
							<form action="/logout" method="POST">
								<button
									type="submit"
									className="cursor-pointer text-base text-foreground transition hover:underline"
								>
									Esci
								</button>
							</form>
						</li>
					</ul>
				</nav>
			)}

			{isMobile && (
				<>
					<button
						type="button"
						className="toggle-menu b-0 z-101 flex h-9 w-9 items-center justify-center bg-transparent p-0 text-white"
						aria-expanded={isOpen}
						onClick={() => setIsOpen(!isOpen)}
					>
						<Dice6 size="36" />
					</button>

					<MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
				</>
			)}
		</header>
	);
}
