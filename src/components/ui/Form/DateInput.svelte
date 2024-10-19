<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';
	import { DateField } from 'bits-ui';
	import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: Date;
	export let helperText: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;

	let _value: CalendarDate;
	$:{
		_value = value ? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate()) :
			new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

		console.log({ _value });
	}
</script>

<label for={id}>
	{label}
</label>

<div class='form-field-wrapper'>
	<!--	<input id={id}-->
	<!--				 name={name}-->
	<!--				 type="date"-->
	<!--				 aria-invalid={errors ? 'true' : undefined}-->
	<!--				 aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }-->
	<!--				 bind:value-->
	<!--				 {...constraints}-->
	<!--				 {...$$props}-->
	<!--	/>-->
	<DateField.Root bind:value={_value} {...constraints} {...$$props} locale="it" class="date-input-wrapper">
		<input type="hidden" name={name} value={_value.toDate(getLocalTimeZone())} />
		<DateField.Input let:segments class="date-input-segments-wrapper">
			{#each segments as { part, value }}
				<DateField.Segment {part} class="date-input-segment">
					{value}
				</DateField.Segment>
			{/each}
		</DateField.Input>
	</DateField.Root>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{errors}</p>
	{/if}
</div>
