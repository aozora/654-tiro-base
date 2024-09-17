<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';

	interface Props {
		id: string;
		label: string;
		name: string;
		min: number;
		max: number;
		value: number;
		helperText: string | undefined;
		errors: string[] | undefined;
		constraints: InputConstraint | undefined;
	}

	let {
		id = crypto.randomUUID(),
		label,
		name,
		min,
		max,
		value,
		helperText = undefined,
		errors = undefined, constraints = undefined,
		...restProps
	}: Props = $props();
</script>

<label for={id}>
	{label}
	<!--{#if required}<span aria-label='required'>*</span>{/if}-->
</label>

<div class='form-field-wrapper'>
	<input id={id}
				 name={name}
				 type="number"
				 min={min}
				 max={max}
				 aria-invalid={errors ? 'true' : undefined}
				 aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
				 bind:value
				 {...constraints}
				 {...restProps}
	/>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{errors}</p>
	{/if}
</div>
