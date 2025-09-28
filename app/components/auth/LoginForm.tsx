import type React from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	// const signIn = async () => {
	// 	await authClient.signIn.email(
	// 		{
	// 			email,
	// 			password,
	// 		},
	// 		{
	// 			onRequest: (ctx) => {
	// 				// show loading state
	// 			},
	// 			onSuccess: (ctx) => {
	// 				// redirect to home
	// 			},
	// 			onError: (ctx) => {
	// 				alert(ctx.error);
	// 			},
	// 		},
	// 	);
	// };

	return (
		<div
			className={cn('flex min-w-80 flex-col gap-6 lg:min-w-100', className)}
			{...props}
		>
			<Card>
				<CardHeader className="text-center">
					<CardTitle>
						<h1 className="font-brutal text-5xl text-brand">Risiko!</h1>
					</CardTitle>
					<CardDescription>
						<h2 className="font-brutal text-5xl text-brand">654 tiro base!</h2>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email" className="font-sans">
									Email
								</Label>
								{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									className="font-sans"
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password" className="font-sans">
										Password
									</Label>
									{/*<a*/}
									{/*	href="#"*/}
									{/*	className="ml-auto inline-block text-sm underline-offset-4 hover:underline"*/}
									{/*>*/}
									{/*	Forgot your password?*/}
									{/*</a>*/}
								</div>
								{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
								<Input
									id="password"
									type="password"
									required
									className="font-sans"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									Entra
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
