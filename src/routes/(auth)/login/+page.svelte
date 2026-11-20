<script lang="ts">
	import {
		createForm,
		Field,
		Form,
		setErrors,
		type SubmitHandler,
	} from '@formisch/svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';
	import { cn } from '#lib/utils.ts';
	import { formSchema } from './schema';

	const loginForm = createForm({
		schema: formSchema,
		initialInput: {
			email: '',
			password: '',
		},
	});

	const handleSubmit: SubmitHandler<typeof formSchema> = async (output) => {
		try {
			const result = await postAction('/login', output);
			if (result.type === 'failure' || result.type === 'error') {
				setErrors(loginForm, {
					errors: [failureMessage(result, 'Signin failed')],
				});
			}
		} catch (error) {
			console.error(error);
			setErrors(loginForm, { errors: ['Unexpected error'] });
		}
	};
</script>

<svelte:head>
	<!-- The backdrop is a CSS background, so the browser cannot discover it from the HTML -->
	<link
		rel="preload"
		as="image"
		href="/img/frame6.webp"
		type="image/webp"
		fetchpriority="high"
	/>
</svelte:head>

<div
	class={cn(
		'flex min-h-dvh w-full flex-1 items-center justify-center px-4 py-8',
		'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
	)}
>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-6">
		<Card.Root>
			<Card.Header class="text-center">
				<Card.Title>
					<h1 class="font-brutal text-4xl text-brand sm:text-5xl">Risiko!</h1>
				</Card.Title>
				<h2 class="font-brutal text-4xl text-brand sm:text-5xl">
					654 tiro base!
				</h2>
			</Card.Header>
			<Card.Content>
				<Form
					of={loginForm}
					onsubmit={handleSubmit}
					class="flex flex-col gap-4"
				>
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
								<p
									id="login-password-error"
									class="mb-4 text-sm text-destructive"
								>
									{field.errors[0]}
								</p>
							{/if}
						{/snippet}
					</Field>

					<Button
						type="submit"
						disabled={loginForm.isSubmitting}
						class="w-full"
					>
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
