import { Argon2id } from 'oslo/password';
import { db, users, players } from './index.js';

async function seed() {
	console.log(`Starting seeding database... 🌱`);

	// create admin user
	await db.insert(users).values({
		email: 'marcello.kot@yandex.com',
		role: 'admin',
		password: await new Argon2id().hash('T@t0Ts@r!')
	});

	// create viewer user
	await db.insert(users).values({
		email: 'porco@dio.com',
		role: 'user',
		password: await new Argon2id().hash('654tirobase')
	});

	// create viewer user
	await db.insert(users).values({
		email: 'test@654.it',
		role: 'user',
		password: await new Argon2id().hash('654tirobase')
	});

	// create players
	const playersToCreate = [
		{ name: 'Marcello' },
		{ name: 'Ale' },
		{ name: 'Marco' },
		{ name: 'Luca' },
		{ name: 'Davide' },
		{ name: 'Ivan' }
	];

	await db.insert(players).values(playersToCreate);

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
