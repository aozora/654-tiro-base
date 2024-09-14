<script lang='ts'>
	import type { InputConstraint } from 'sveltekit-superforms';
	import { Switch } from 'bits-ui';

	export let id: string = crypto.randomUUID();
	export let label: string;
	export let name: string;
	export let value: boolean;
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
	<Switch.Root
		id="marketing"
		class="toggle"
	>
		<Switch.Thumb
			class="toggle-thumb"
		/>
	</Switch.Root>
	<Switch
		name={name}
		class={`cb-toggle ${value ? "cb-toggle-enabled" : "cb-toggle-disabled"}`}
		bind:checked={value}
		aria-invalid={errors ? 'true' : undefined}
		aria-describedby={errors ? `${name}-message` : helperText ? `${name}-helper`: undefined }
		required={required}
		readonly={readonly}
		disabled={disabled}
		{...constraints}
		{...$$restProps}
	>
		<input type="hidden" {id} {name} bind:value />
		<span class='cb-toggle-value' class:toggle-on={value} class:toggle-off={!value} />
	</Switch>

	{#if helperText}
		<p id={`${name}-helper`}>{helperText}</p>
	{/if}

	{#if errors}
		<p id={`${name}-message`} role='alert'>{invalidMessage}</p>
	{/if}
</div>

<style lang="scss">
  .toggle {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    width: 60px;
    height: 36px;
    min-height: 36px;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 50%;
    cursor: pointer;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s;

    //:is(.dark .dark\:data-\[state\=checked\]\:bg-foreground[data-state=checked]) {
    //  --tw-bg-opacity: 1;
    //  background-color: hsl(var(--foreground) / var(--tw-bg-opacity));
    //}
    //.data-\[state\=checked\]\:bg-foreground[data-state=checked] {
    //  --tw-bg-opacity: 1;
    //  background-color: hsl(var(--foreground) / var(--tw-bg-opacity));
    //}
  }

  .toggle-thumb {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    margin: 0px;
    transform: translateX(-100%);
  }
</style>
