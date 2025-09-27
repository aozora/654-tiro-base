import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Helper function for client-side session checking
export function useAuth() {
	const session = useSession();
	// Use any type to bypass TypeScript errors with better-auth API
	const sessionData = (session as any).data;
	return {
		user: sessionData?.user ?? null,
		session: sessionData?.session ?? null,
		isLoading: sessionData === undefined,
		isSignedIn: !!sessionData?.user
	};
}
