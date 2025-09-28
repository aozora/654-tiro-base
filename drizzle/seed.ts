import { createAuthClient } from 'better-auth/react';

/********************
 * AUTH & DB clients
 * ******************/
const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: 'http://localhost:5173',
});

async function seed() {
	console.log(`Starting seeding database... 🌱`);

	// create admin user
	const email = 'marcello.kot@yandex.com';
	const password = 'T@t0Ts@r!';

	const { data, error } = await authClient.signUp.email({
		email,
		password,
		name: 'Marcello',
		role: 'admin',
	});

	if (error) {
		console.error({ error });
	}

	console.log({ data });

	await authClient.signUp.email({
		email: 'porco@dio.com',
		password: '654tirobase',
		name: 'Marcello',
		role: 'user',
	});

	// // create players
	// const playersToCreate = [
	// 	{ name: 'Marcello' },
	// 	{ name: 'Ale' },
	// 	{ name: 'Marco' },
	// 	{ name: 'Luca' },
	// 	{ name: 'Davide' },
	// 	{ name: 'Ivan' },
	// ];
	//
	// await db.insert(players).values(playersToCreate);

	console.log(`Database has been seeded. 🌱🌱🌱`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		process.exit(0);
	});
