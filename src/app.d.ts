declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/better-auth').User | null;
			session: import('$lib/server/better-auth').Session | null;
		}
	}
}

export {};
