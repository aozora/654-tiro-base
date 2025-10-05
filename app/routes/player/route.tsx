import { ChevronRight } from 'lucide-react';
import { data, Link } from 'react-router';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import PlayerProfile from '@/components/PlayerProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import type { Tournament } from '@/lib/database/schema';
import { pluralizePoints } from '@/lib/helpers';
import {
	getPlayerById,
	getPlayerStats,
	getTournament,
	type PlayerStats,
} from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/route';

const chartConfig = {
	y: {
		label: 'Punti',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export async function loader({ params }: Route.LoaderArgs) {
	const { tournamentId, playerId } = params;

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const stats: PlayerStats = await getPlayerStats(tournamentId, playerId);

	return data({
		player,
		tournament,
		stats,
	});
}

// const CustomXAxisTick = ({ x, y, stroke, payload }) => {
// 	return (
// 		<g transform={`translate(${x},${y})`}>
// 			<text
// 				x={0}
// 				y={0}
// 				dy={16}
// 				textAnchor="end"
// 				fill="#666"
// 				transform="rotate(-35)"
// 			>
// 				{payload.value}
// 			</text>
// 		</g>
// 	);
// };

export default function TournamentPlayerMatchesPage({
	loaderData,
}: Route.ComponentProps) {
	const { player, tournament, stats } = loaderData;

	const points = stats.matchesDatesAndPoints.map((m) => {
		return {
			x: m.date,
			y: m.points,
		};
	});

	return (
		<div className={cn('relative min-h-screen')}>
			<img
				src="/img/risiko-challenge-tabellone.webp"
				className="-z-1 absolute top-0 left-0 h-full w-full object-cover blur-xs"
				alt=""
			/>

			<Header tournament={tournament} />

			<Main className="user-page">
				<div className="matches flex flex-col">
					<PageTitle
						title={`Profilo di ${player.name}`}
						showBackButton={true}
					/>

					<PlayerProfile player={player} stats={stats} />

					<Card className="chart mb-12 h-50 w-full">
						<CardContent>
							<ChartContainer config={chartConfig} className="h-50 w-full">
								<LineChart
									accessibilityLayer
									margin={{
										top: 20,
										right: 10,
										left: 10,
										bottom: 20,
									}}
									data={points}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="x"
										tickFormatter={(value) =>
											`${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(value)}`
										}
									/>
									<YAxis dataKey="y" />
									<Line type="monotone" dataKey="y" activeDot={{ r: 8 }} />
									<ChartTooltip content={<ChartTooltipContent />} />
								</LineChart>
							</ChartContainer>
						</CardContent>
					</Card>

					<div className="matches-wrapper mx-auto w-full max-w-3xl">
						<h2 className="h-20 w-full text-center text-2xl">
							Partite giocate: {stats.matchesDatesAndPoints.length}
						</h2>
						<ul className="flex flex-col gap-5">
							{stats.matchesDatesAndPoints?.map((match) => (
								<li key={match.matchId} className="h-12">
									<Button
										asChild
										variant="secondary"
										className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
									>
										<Link to={`/matches/${tournament.id}/${match.matchId}`}>
											<span>
												{new Intl.DateTimeFormat('it', {
													dateStyle: 'short',
												}).format(match.date)}
											</span>
											<span className="points">
												{pluralizePoints(match.points)}
											</span>
											<ChevronRight size="24" />
										</Link>
									</Button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Main>
		</div>
	);
}
