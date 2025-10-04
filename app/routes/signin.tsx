import { arktypeResolver } from '@hookform/resolvers/arktype';
import { Shell } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect } from 'react-router';
import { toast } from 'sonner';
import { type LoginData, LoginSchema } from '@/components/auth/schema';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import type { Route } from './+types/signin';

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (session?.user) {
		return redirect('/leaderboard');
	}

	return {};
}

export default function SignIn() {
	const [isSignInPending, setIsSignInPending] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const form = useForm<LoginData>({
		resolver: arktypeResolver(LoginSchema),
	});

	const onSubmit = async (data: LoginData) => {
		console.log(`??🍉🍉 onsubmit`);
		setIsSignInPending(true);
		setServerError(null);

		try {
			const { error } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});

			if (error) {
				const errorMessage = error.message || 'Accesso fallito.';
				console.log(`🍉🍉🍉 onsubmit`, errorMessage);
				setServerError(errorMessage);
				toast.error(errorMessage);
				setIsSignInPending(false);
				return;
			}

			// Use window.location for full page navigation after auth
			window.location.href = '/leaderboard';
		} catch (_err) {
			const errorMessage = 'Si è verificato un errore. Riprova.';
			console.log(`🍉🍉🍉 onsubmit`, errorMessage);
			setServerError(errorMessage);
			toast.error(errorMessage);
			setIsSignInPending(false);
		}
	};

	return (
		<div
			className={cn(
				'flex h-full min-h-screen w-full items-center justify-center',
				'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
			)}
		>
			<div
				className={cn(
					'flex min-w-80 flex-col gap-6 lg:min-w-100',
					'mx-auto max-w-7xl',
				)}
			>
				<Card>
					<CardHeader className="text-center">
						<CardTitle>
							<h1 className="font-brutal text-5xl text-brand">Risiko!</h1>
						</CardTitle>
						<CardDescription>
							<h2 className="font-brutal text-5xl text-brand">
								654 tiro base!
							</h2>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-2">
									{/*{serverError && (*/}
									{/*	<div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-red-500 text-sm">*/}
									{/*		{serverError}*/}
									{/*	</div>*/}
									{/*)}*/}

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email:</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="la tua email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password:</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="la tua password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="mt-6 flex flex-col gap-3">
										<Button
											type="submit"
											className="w-full"
											disabled={isSignInPending}
										>
											{isSignInPending ? 'Accesso in corso...' : 'Entra'}
											{isSignInPending && (
												<Shell size={24} className="animate-spin" />
											)}
										</Button>
									</div>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
