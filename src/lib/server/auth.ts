// import { Lucia } from 'lucia';
// import { dev } from '$app/environment';
// import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
// // import { PrismaClient } from "@prisma/client";

// // const client = new PrismaClient();
// import prisma from '$lib/server/prisma';

// const adapter = new PrismaAdapter(prisma.session, prisma.user);

// export const lucia = new Lucia(adapter, {
// 	sessionCookie: {
// 		attributes: {
// 			// set to `true` when using HTTPS
// 			secure: !dev
// 		}
// 	},
// 	getUserAttributes: (attributes) => {
// 		return {
// 			email: attributes.email,
// 			role: attributes.role,
// 			picture: attributes.picture
// 		};
// 	}
// });

// declare module 'lucia' {
// 	interface Register {
// 		Lucia: typeof lucia;
// 		DatabaseUserAttributes: DatabaseUserAttributes;
// 	}
// }

// interface DatabaseUserAttributes {
// 	email: string;
// 	role: string;
// 	picture: string;
// }
