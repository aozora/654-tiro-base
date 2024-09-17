import prisma from '$lib/server/prisma';
import type { Player, Tournament } from '@prisma/client';

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

export type TournamentWithPlayers = {
	PlayersOnTournaments: ({
		player: { id: string; name: string; picture: string | null; isActive: boolean };
	} & {
		playerId: string;
		tournamentId: string;
		isActive: boolean;
	})[];
};

export async function getTournamentPlayers(id: string): Promise<TournamentWithPlayers | null> {
	return prisma.tournament.findUnique({
		include: {
			PlayersOnTournaments: {
				include: {
					player: true
				}
			}
		},
		where: { id }
	});
}

export async function addPlayerToTournament(tournamentId: string, playerId: string) {
	return prisma.playersOnTournaments.create({
		data: {
			tournamentId,
			playerId
		}
	});
}

export async function deletePlayerFromTournament(tournamentId: string, playerId: string) {
	return prisma.playersOnTournaments.delete({
		where: {
			playerId_tournamentId: {
				tournamentId,
				playerId
			}
		}
	});
}
