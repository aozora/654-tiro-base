import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';

const prisma = new PrismaClient();

async function seed() {
	console.log(`Starting seeding database... 🌱`);

	// create admin user
	await prisma.user.create({
		data: {
			id: generateId(15),
			email: 'marcello.kot@yandex.com',
			role: 'admin',
			password: await new Argon2id().hash('T@t0Ts@r!')
		}
	});

	// create viewer user
	await prisma.user.create({
		data: {
			id: generateId(15),
			email: 'porco@dio.com',
			role: 'user',
			password: await new Argon2id().hash('654tirobase')
		}
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
