import { index, type RouteConfig, route } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// export default flatRoutes() satisfies RouteConfig;
export default [
	index('routes/_index.tsx'),

	// auth
	route('api/auth/*', './routes/api.auth.$.ts'),
	route('signin', './routes/signin.tsx'),
	route('logout', './routes/logout.tsx'),

	// app
	route('tournaments', './routes/tournaments.tsx'),
	route('leaderboard/:tournamentId?', './routes/leaderboard/route.tsx'),
	route('matches/:tournamentId', './routes/matches/matches.$tournamentId.tsx'),
	route(
		'matches/:tournamentId/:matchId',
		'./routes/matches/matches.$tournamentId.$matchId.tsx',
	),
	route('player/:tournamentId/:playerId', './routes/player/route.tsx'),
] satisfies RouteConfig;
