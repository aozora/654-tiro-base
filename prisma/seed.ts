import { Argon2id } from 'oslo/password';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	console.log(`Starting seeding database... 🌱`);

	// cleanup the existing database
	// await prisma.user.deleteMany({ where: { email: 'marcello.kot@yandex.com' } }).catch(() => {
	// 	// no worries if it doesn't exist yet
	// });
	// await prisma.user.deleteMany({ where: { email: 'porco@dio.com' } }).catch(() => {
	// 	// no worries if it doesn't exist yet
	// });

	// create admin user
	await prisma.user.create({
		data: {
			// id: generateId(15),
			email: 'marcello.kot@yandex.com',
			role: 'admin',
			password: await new Argon2id().hash('T@t0Ts@r!')
		}
	});

	// create viewer user
	await prisma.user.create({
		data: {
			// id: generateId(15),
			email: 'porco@dio.com',
			role: 'user',
			password: await new Argon2id().hash('654tirobase')
		}
	});

	// create viewer user
	await prisma.user.create({
		data: {
			// id: generateId(15),
			email: 'test@654.it',
			role: 'user',
			password: await new Argon2id().hash('654tirobase')
		}
	});

	// create players
	await prisma.player.create({
		data: {
			name: 'Marcello'
		}
	});
	await prisma.player.create({
		data: { name: 'Ale' }
	});
	await prisma.player.create({
		data: { name: 'Marco' }
	});
	await prisma.player.create({
		data: { name: 'Luca' }
	});
	await prisma.player.create({
		data: { name: 'Davide' }
	});
	await prisma.player.create({
		data: { name: 'Ivan' }
	});

	console.log(`Database has been seeded. 🌱🌱🌱`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
