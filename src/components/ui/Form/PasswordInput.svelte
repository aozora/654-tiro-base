<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: string;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let invalidMessage: string | undefined = undefined;
	export let helperText: string | undefined = undefined;

	// superforms requirements
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<label for={id}>
	{label}
	{#if required}<span aria-label='required'>*</span>{/if}
</label>
<div class='cb-form-field-wrapper'>
	<input id={id}
				 name={name}
				 type='password'
				 placeholder={placeholder}
				 aria-invalid={errors ? 'true' : undefined}
				 aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
				 required={required}
				 readonly={readonly}
				 disabled={disabled}
				 bind:value
				 {...constraints}
				 {...$$props}
	/>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{invalidMessage}</p>
	{/if}
</div>
