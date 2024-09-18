import prisma from '$lib/server/prisma';
import type { Match, Player, Tournament } from '@prisma/client';

export async function getPlayers(): Promise<Array<Player>> {
	return prisma.player.findMany({
		orderBy: [
			{
				name: 'asc'
			}
		]
	});
}

export async function upsertPlayer(
	id: undefined | string,
	name: string,
	isActive: boolean
	// picture: string
): Promise<Player> {
	console.log({ id, name, isActive });

	return prisma.player.upsert({
		where: {
			id: id
		},
		update: {
			name,
			isActive
			// picture
		},
		create: {
			name,
			isActive
			// picture
		}
	});
}

export async function updatePlayerPicture(
	id: undefined | string,
	picture: string
): Promise<Player> {
	return prisma.player.update({
		where: {
			id: id
		},
		data: {
			picture
		}
	});
}

export async function deletePlayer(id: string): Promise<Player> {
	return prisma.player.delete({
		where: {
			id: id
		}
	});
}

export async function getTournaments(): Promise<Array<Tournament>> {
	return prisma.tournament.findMany({
		orderBy: [
			{
				title: 'asc'
			}
		]
	});
}

export async function getTournament(id: string): Promise<Tournament> {
	return prisma.tournament.findUniqueOrThrow({
		where: { id }
	});
}

export async function getActiveTournament(): Promise<Tournament> {
	return prisma.tournament.findFirstOrThrow({
		where: {
			isActive: true
		}
	});
}

export async function upsertTournament(
	id: undefined | string,
	title: string,
	isActive: boolean
): Promise<Tournament> {
	return prisma.tournament.upsert({
		where: {
			id: id
		},
		update: {
			title,
			isActive
		},
		create: {
			title,
			isActive
		}
	});
}

export async function getMatches(tournamentId: string): Promise<Array<Match>> {
	return prisma.match.findMany({
		// include: {
		// 	players: {
		// 		select: {
		// 			player: true
		// 		}
		// 	}
		// },
		where: { tournamentId },
		orderBy: {
			date: 'desc'
		}
	});
}

export async function getMatch(id: string): Promise<Match> {
	return prisma.match.findUniqueOrThrow({
		where: { id }
	});
}

export async function upsertMatch(
	id: undefined | string,
	tournamentId: string,
	date: Date
): Promise<Match> {
	console.log({ id, tournamentId, date });

	return prisma.match.upsert({
		where: {
			id: id
		},
		update: {
			date
		},
		create: {
			date,
			tournamentId
		}
	});
}

export async function deleteMatchDeep(id: string): Promise<Match> {
	await prisma.playersOnMatches.deleteMany({
		where: {
			matchId: id
		}
	});

	return prisma.match.delete({
		where: {
			id: id
		}
	});
}

export type PlayerExtended = Player & { points: number };

export async function getMatchPlayers(matchId: string): Promise<Array<PlayerExtended>> {
	const data = await prisma.playersOnMatches.findMany({
		include: {
			player: true
		},
		where: {
			matchId
		}
		// orderBy: {
		// 	player: {
		// 		name: true
		// 	}
		// }
	});

	return data.map((x) => {
		return {
			...x.player,
			points: x.points
		} satisfies PlayerExtended;
	});
}

export async function upsertMatchPlayer(matchId: string, playerId: string, points: number) {
	return prisma.playersOnMatches.upsert({
		where: {
			playerId_matchId: { playerId, matchId }
		},
		update: {
			points
		},
		create: {
			matchId,
			playerId,
			points
		}
	});
}

export async function removePlayerFromMatch(matchId: string, playerId: string) {
	return prisma.playersOnMatches.delete({
		where: {
			playerId_matchId: { playerId, matchId }
		}
	});
}

export async function getLeaderboard(tournamentId: string) {
	// get all tournament matches
	// group by player
	// sum points
	// order by points

	// restituisce un array (di matches) che contiene un array di playersfrmatch
	// const matches = await prisma.match.findMany({
	// 	where: {
	// 		tournamentId
	// 	},
	// 	select: {
	// 		players: true
	// 	}
	// });

	// get all the matches of the given tournament
	const matches = await prisma.match.findMany({
		where: {
			tournamentId
		}
	});

	const playersStatus = await prisma.playersOnMatches.groupBy({
		by: ['playerId'],
		where: {
			match: {
				equals: tournamentId
			}
		}
	});

	console.log({ matches });
	return matches;
}
