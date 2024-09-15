<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';
	import { Switch } from 'bits-ui';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: boolean;
	export let disabled: boolean | undefined = undefined;
	// export let readonly: boolean | undefined = undefined;
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

<div class='form-field-wrapper'>
	<Switch.Root
		id={id}
		class="toggle" name={name}
		bind:checked={value}
		aria-invalid={errors ? 'true' : undefined}
		aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
		required={required}
		disabled={disabled}
		{...constraints}
		{...$$restProps}
	>
		<Switch.Thumb
			class="toggle-thumb"
		/>
	</Switch.Root>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{invalidMessage}</p>
	{/if}
</div>
