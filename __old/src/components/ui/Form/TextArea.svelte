<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: string;
	export let rows: number;
	export let helperText: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<label for={id}>
	{label}
	<!--{#if required}<span aria-label='required'>*</span>{/if}-->
</label>
<div class='cb-form-field-wrapper'>
  <textarea id={id}
						name={name}
						rows={rows}
						aria-invalid={errors ? 'true' : undefined}
						aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
						bind:value
						{...constraints}
						{...$$props}
	></textarea>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{errors}</p>
	{/if}
</div>
