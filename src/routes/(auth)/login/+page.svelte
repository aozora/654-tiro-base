<script lang="ts">
	import * as Card from '#lib/components/ui/card/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { formSchema } from './schema';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import { cn } from '#lib/utils.ts';
	import { createForm, Field, Form, setErrors, type SubmitHandler } from '@formisch/svelte';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';

	const loginForm = createForm({
		schema: formSchema,
		initialInput: {
			email: '',
			password: ''
		}
	});

	const handleSubmit: SubmitHandler<typeof formSchema> = async (output) => {
		try {
			const result = await postAction('/login', output);
			if (result.type === 'failure' || result.type === 'error') {
				setErrors(loginForm, {
					errors: [failureMessage(result, 'Signin failed')]
				});
			}
		} catch (error) {
			console.error(error);
			setErrors(loginForm, { errors: ['Unexpected error'] });
		}
	};
</script>

<div
	class={cn(
		'flex h-full min-h-screen w-full items-center justify-center',
		'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat'
	)}
>
	<div class={cn('flex min-w-80 flex-col gap-6 lg:min-w-100', 'mx-auto max-w-7xl')}>
		<Card.Root>
			<Card.Header class="text-center">
				<Card.Title>
					<h1 class="font-brutal text-5xl text-brand">Risiko!</h1>
				</Card.Title>
				<h2 class="font-brutal text-5xl text-brand">654 tiro base!</h2>
			</Card.Header>
			<Card.Content>
				<Form of={loginForm} onsubmit={handleSubmit} class="flex flex-col gap-4">
					<Field of={loginForm} path={['email']}>
						{#snippet children(field)}
							<Label for="login-email">Email</Label>
							<Input
								{...field.props}
								id="login-email"
								type="email"
								placeholder="Inserisci l'email..."
								value={field.input}
								aria-invalid={!!field.errors}
								aria-errormessage="login-email-error"
							/>
							{#if field.errors}
								<p id="login-email-error" class="mb-4 text-sm text-destructive">
									{field.errors[0]}
								</p>
							{/if}
						{/snippet}
					</Field>

					<Field of={loginForm} path={['password']}>
						{#snippet children(field)}
							<Label for="login-password">Password</Label>
							<Input
								{...field.props}
								id="login-password"
								type="password"
								value={field.input}
								aria-invalid={!!field.errors}
								aria-errormessage="login-password-error"
							/>
							{#if field.errors}
								<p id="login-password-error" class="mb-4 text-sm text-destructive">
									{field.errors[0]}
								</p>
							{/if}
						{/snippet}
					</Field>

					<Button type="submit" disabled={loginForm.isSubmitting} class="w-full">
						{loginForm.isSubmitting ? 'Caricamento...' : 'Entra'}
					</Button>

					{#if loginForm.errors}
						<div class="mt-3 rounded-md text-red-700">
							{loginForm.errors[0]}
						</div>
					{/if}
				</Form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
