import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function freshStart() {
	console.log('🧹 Starting fresh authentication setup...');

	try {
		// Clear any existing auth-related data
		console.log('Clearing existing sessions...');
		await prisma.session.deleteMany();

		console.log('Clearing existing users...');
		await prisma.user.deleteMany();

		console.log('✅ Database cleaned successfully!');
		console.log('🎉 Ready for fresh user registrations with Better Auth!');
		console.log('');
		console.log('Next steps:');
		console.log('1. Start your development server: npm run dev');
		console.log('2. Navigate to /signup to create new accounts');
		console.log('3. All users will need to create fresh accounts');
	} catch (error) {
		console.error('❌ Error during fresh start:', error);
		throw error;
	}
}

freshStart()
	.catch((e) => {
		console.error('Fresh start failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
