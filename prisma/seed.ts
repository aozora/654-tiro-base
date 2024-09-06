// import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });
// const prisma = new PrismaClient();
// import prisma from '../src/lib/server/prisma';

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
