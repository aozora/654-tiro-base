<script lang="ts">
	import Icon, { type IconName } from '#components/Icon.svelte';
	import * as AlertDialog from '#lib/components/ui/alert-dialog/index.ts';
	import type { ButtonProps } from '#lib/components/ui/button/button.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { cn } from '#lib/utils.ts';

	type Props = ButtonProps & {
		icon?: IconName;
		label?: string;
		action: string;
		ids: Array<{ name: string; value: string }>;
		/** When set, the form is only submitted after the user confirms. */
		confirm?: { title: string; description?: string };
	};

	let {
		icon,
		children,
		label,
		action,
		ids,
		confirm,
		class: className,
		...buttonProps
	}: Props = $props();

	let form: HTMLFormElement | undefined = $state();
	let isConfirmOpen = $state(false);
</script>

<form bind:this={form} {action} method="POST">
	{#each ids as id (id.name)}
		<input type="hidden" name={id.name} value={id.value} />
	{/each}

	<Button
		{...buttonProps}
		type={confirm ? 'button' : 'submit'}
		class={cn('flex h-11 w-full @2xl/table:h-9 @2xl/table:w-auto', className)}
		onclick={confirm ? () => (isConfirmOpen = true) : undefined}
	>
		{#if icon}
			<Icon name={icon} size={24} aria-hidden="true" />
		{/if}
		{@render children?.()}
		{#if label}
			<span class="@2xl/table:sr-only @3xl/table:not-sr-only">{label}</span>
		{/if}
	</Button>
</form>

{#if confirm}
	<AlertDialog.Root bind:open={isConfirmOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{confirm.title}</AlertDialog.Title>
				<AlertDialog.Description>
					{confirm.description ?? "L'operazione non può essere annullata."}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Annulla</AlertDialog.Cancel>
				<AlertDialog.Action
					variant="destructive"
					onclick={() => form?.requestSubmit()}
				>
					{label ?? 'Conferma'}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
