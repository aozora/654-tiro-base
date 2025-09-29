import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';
import { formSchema } from '@/components/auth/schema';
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
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// Clear errors when user starts typing
	const clearError = () => {
		if (error) setError(null);
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError(null);
		setIsLoading(true);

		try {
			const { data, error } = await authClient.signIn.email({
				email: values.email,
				password: values.password,
			});

			if (error) {
				setError(error.message || 'Invalid email or password');
				return;
			}

			if (data) {
				// Successfully signed in - redirect to leaderboard
				navigate('/leaderboard');
			}
		} catch (_err) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

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
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email:</FormLabel>
											<FormControl>
												<Input
													placeholder="la tua email"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														clearError();
													}}
												/>
											</FormControl>
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
													onChange={(e) => {
														field.onChange(e);
														clearError();
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								{error && <FormMessage>{error}</FormMessage>}

								<div className="flex flex-col gap-3">
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? 'Accesso in corso...' : 'Entra'}
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
