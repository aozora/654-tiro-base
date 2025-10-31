export enum Icons {
	TankBlue = 'tank-blue',
	TankBrand = 'tank-brand'
}

export type PlayerLeaderboard = {
	playerId: string;
	name: string;
	picture: string;
	sumPoints: number;
	sumTerritoriesPoints: number;
};

export type PlayerLeaderboardWithNormalizedRanking = {
	rank: number;
	playerId: string;
	name: string;
	picture: string;
	sumPoints: number;
	sumTerritoriesPoints: number;
};
