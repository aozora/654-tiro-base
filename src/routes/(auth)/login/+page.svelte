<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Shell } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let form = $derived(
		superForm(data.form, {
			validators: valibotClient(formSchema),
			dataType: 'json'
		})
	);
	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);
</script>

<div
	class={cn(
				'flex h-full min-h-screen w-full items-center justify-center',
				'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
			)}
>
	<div
		class={cn(
					'flex min-w-80 flex-col gap-6 lg:min-w-100',
					'mx-auto max-w-7xl',
				)}
	>
		<Card.Root>
			<Card.Header class="text-center">
				<Card.Title>
					<h1 class="font-brutal text-5xl text-brand">Risiko!</h1>
				</Card.Title>
				<Card.Description>
					<h2 class="font-brutal text-5xl text-brand">
						654 tiro base!
					</h2>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance>

					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									bind:value={$formData.email}
									type="email"
									placeholder="Inserisci l'email..."
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors class="mb-4 *:mb-2" />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input type="password" bind:value={$formData.password} {props} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors class="mb-4 *:mb-2" />
					</Form.Field>

					<Form.Button disabled={$submitting} class="w-full">
						{$submitting ? 'Caricamento...' : 'Entra'}
					</Form.Button>

					{#if $errors?._errors}
						<div class="mt-3 rounded-md text-red-700">
							{$errors?._errors}
						</div>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
