<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: string;
	export let helperText: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<label for={id}>
	{label}
	<!--{#if required}<span aria-label='required'>*</span>{/if}-->
</label>

<div class='form-field-wrapper'>
	<select id={id}
					name={name}
					aria-invalid={errors ? 'true' : undefined}
					aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
					bind:value
					{...constraints}
					{...$$props}>
		<slot></slot>
	</select>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{errors}</p>
	{/if}
</div>
