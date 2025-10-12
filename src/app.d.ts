import type { Session } from '$lib/server/session';
import type { User } from '$lib/server/user';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
