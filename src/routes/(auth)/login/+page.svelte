<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { authSchema } from '$lib/schemas/auth-schema';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/(auth)/login/$types';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';

	export let data: ActionData;

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: zod(authSchema),
		//   field: (value) => string | string[] | null | undefined;
		// },
		validationMethod: 'submit-only' //  | 'oninput' | 'onblur' | 'submit-only' = 'auto',
	});
	// console.log({$form}, {$message})
</script>


<div class="auth-frame">
	<h1>Risiko!</h1>
	<h2>654 tiro base!</h2>

	<form method="POST" use:enhance>
		<label for="email">Email</label>
		<input id="email"
					 name="email"
					 aria-invalid={$errors.email ? 'true' : undefined}
					 bind:value={$form.email}
					 {...$constraints.email} />
		{#if $errors.email}<p class="invalid">{$errors.email}</p>{/if}

		<br />

		<label for="password">Password</label>
		<input type="password"
					 id="password"
					 name="password"
					 aria-invalid={$errors.password ? 'true' : undefined}
					 bind:value={$form.password}
					 {...$constraints.password} />
		{#if $errors.password}<p class="invalid">{$errors.password}</p>{/if}
		<br />

		<button type="submit" class="button">
			<span>Entra</span>
			<Icon id={Icons.TankBrand}/>
		</button>

		{#if $message}<p>{$message}</p>{/if}
		{#if data.message}<p>{data.message}</p>{/if}
	</form>

<!--	<a href="/signup">Create an account</a>-->
</div>
