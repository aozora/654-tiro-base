export enum Icons {
	TankBlue = 'tank-blue',
	TankBrand = 'tank-brand',
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

/** A row of the tournament leaderboard, whichever score it is ranked by. */
export type LeaderboardEntry = PlayerLeaderboardWithNormalizedRanking & {
	matchesPlayed: number;
	/** Territory points per match played. */
	averageTerritoriesPoints: number;
};
