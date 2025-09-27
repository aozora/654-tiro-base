<script lang="ts">
	import { DateField } from 'bits-ui';
	import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

	export let label = '';
	export let name = '';
	export let required = false;
	export let errors: string[] = [];
	export let constraints: any = {};
	export let value: Date | undefined = undefined;

	let _value = value ? CalendarDate.fromDate(value) : new CalendarDate(2023, 1, 1);

	$: if (value) {
		_value = CalendarDate.fromDate(value);
	}
</script>

<div class="form-group">
	{#if label}
		<label for={name}>
			{label}
			{#if required}<span aria-label="required">*</span>{/if}
		</label>
	{/if}

	<DateField.Root bind:value={_value} {...constraints} {...$$restProps} locale="it">
		<input type="hidden" {name} value={_value.toDate(getLocalTimeZone())} />
		<DateField.Input let:segments class="date-input">
			{#each segments as { part, value }}
				<DateField.Segment {part} class="date-segment">
					{value}
				</DateField.Segment>
			{/each}
		</DateField.Input>
	</DateField.Root>

	{#if errors && errors.length > 0}
		<div class="form-errors">
			{#each errors as error}
				<span class="form-error">{error}</span>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.25rem;
		font-weight: 500;
	}

	.date-input {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		background-color: white;
	}

	.date-segment {
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		outline: none;
	}

	.form-errors {
		margin-top: 0.25rem;
	}

	.form-error {
		display: block;
		color: #dc2626;
		font-size: 0.875rem;
	}
</style>
