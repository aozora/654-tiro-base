import type { ColumnDef } from '@tanstack/react-table';
import { Check, Dices, PackagePlus, PencilLine, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { data, Link } from 'react-router';
import AdminPageTitle from '@/components/AdminPageTitle';
import { DataTable } from '@/components/DataTable';
import Header from '@/components/Header';
import Main from '@/components/Main';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import type { Match, Tournament } from '@/lib/database/schema';
import { getTournaments } from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/tournaments';

export async function loader() {
	const tournaments: Array<Tournament & { matches: Match[] }> =
		await getTournaments();

	return data({
		tournaments,
	});
}

export default function AdminTournamentPage({
	loaderData,
}: Route.ComponentProps) {
	const { tournaments } = loaderData;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [item, setItem] = useState<Tournament | undefined>(undefined);

	const columns: ColumnDef<Tournament>[] = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Titolo torneo',
			},
			{
				accessorKey: 'isActive',
				header: 'Attivo',
				cell: ({ row }) => {
					const isActive = Boolean(row.getValue('isActive'));

					return <>{isActive ? <Check size={24} /> : <X size={24} />}</>;
				},
			},
			{
				accessorKey: 'matches',
				header: 'Num. partite giocate',
				cell: ({ row }) => {
					const matches = row.getValue('matches') as Match[];

					return (
						<span className="text-right font-medium">{matches.length}</span>
					);
				},
			},
			{
				id: 'editAction',
				cell: ({ row }) => {
					const tournament = row.original;

					return (
						<Button
							type="button"
							variant="outline"
							className=""
							onClick={() => onEditTournament(tournament)}
						>
							<PencilLine size={24} />
						</Button>
					);
				},
			},
			{
				id: 'matchesAction',
				cell: ({ row }) => {
					const tournament = row.original;

					return (
						<Button asChild type="button" variant="default" className="">
							<Link to={`/admin/tournaments/${tournament.id}`}>
								<Dices size={24} />
							</Link>
						</Button>
					);
				},
			},
		],
		[onEditTournament],
	);

	const onEditTournament = (row: Tournament) => {
		setItem(row);
		setIsModalOpen(true);
	};

	const createTournament = () => {
		setItem(undefined);
		setIsModalOpen(true);
	};

	return (
		<div className={cn('relative min-h-screen')}>
			<Header />

			<AdminPageTitle title="Gestione tornei" showBackButton={true} />

			<Main className="flex flex-col pb-10">
				<div className="mx-auto w-full max-w-3xl">
					<header className="page-header">
						<Button
							type="button"
							className="button"
							onClick={() => createTournament()}
						>
							<span>Nuovo torneo</span>
							<PackagePlus size={24} />
						</Button>
					</header>
				</div>

				<div className="container mx-auto py-10">
					<DataTable columns={columns} data={tournaments} />
				</div>
			</Main>

			<Dialog open={isModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{item === undefined ? 'Nuovo torneo' : 'Modifica torneo'}
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
