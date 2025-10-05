import { CalendarPlus } from 'lucide-react';
import { useState } from 'react';
import { data } from 'react-router';
import AdminPageTitle from '@/components/AdminPageTitle';
import Header from '@/components/Header';
import Main from '@/components/Main';
import type { Match, Player, Tournament } from '@/lib/database/schema';
import { getMatches, getPlayers, getTournament } from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/tournaments';

export async function loader({ params }: Route.LoaderArgs) {
	const tournamentId: string = params.tournamentId;

	const tournament: Tournament = await getTournament(tournamentId);
	const players: Array<Player> = await getPlayers();
	const matches: Array<Match> = await getMatches(tournamentId);

	if (!tournament) {
		throw new Response(`Tournament Not Found ${tournamentId}`, { status: 404 });
	}

	return data({
		tournament,
		players,
		matches,
	});
}

export default function AdminTournamentMatchesPage({
	loaderData,
}: Route.ComponentProps) {
	const { tournament, players, matches } = loaderData;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [item, setItem] = useState<Match | undefined>(undefined);

	const createMatch = () => {
		setItem(undefined);
		setIsModalOpen(true);
	};

	const onEditMatch = (row: Player) => {
		setItem(row);
		setIsModalOpen(true);
	};

	const onDeleteMatch = (e, row) => {
		const okDelete = confirm(
			`Elimino la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(row.date)} ?`,
		);

		if (!okDelete) {
			e.preventDefault();
			return;
		}
	};

	return (
		<div className={cn('relative min-h-screen')}>
			<Header />

			<AdminPageTitle
				title={`${tournament.title}`}
				subtitle="Gestione partite"
				showBackButton={true}
			/>

			<Main className="flex flex-col pb-10">
				<div className="mx-auto w-full max-w-3xl">
					<header className="page-header">
						<button
							type="button"
							className="button"
							onClick={() => createMatch()}
						>
							<span>Nuova partita</span>
							<CalendarPlus size={24} />
						</button>
					</header>
				</div>
			</Main>
		</div>
	);
}
