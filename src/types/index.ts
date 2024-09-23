export enum Icons {
	TankBlue = 'tank-blue',
	TankBrand = 'tank-brand'
}

export type DatatableColumn = {
	key: string;
	label: string;
};

export type PlayerLeaderboard = {
	playerId: string;
	name: string;
	picture: string;
	sumPoints: number;
};
