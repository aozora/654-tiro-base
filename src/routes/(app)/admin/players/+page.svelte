<script lang="ts">
	import {
		createForm,
		Field,
		Form,
		reset,
		setErrors,
		type SubmitHandler,
	} from '@formisch/svelte';
	import { UserRound } from '@lucide/svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { toast } from 'svelte-sonner';
	import DataTable from '#components/DataTable.svelte';
	import DataTableButton from '#components/DataTableButton.svelte';
	import DataTableFormButton from '#components/DataTableFormButton.svelte';
	import DataTablePlayer from '#components/DataTablePlayer.svelte';
	import DataTableStatus from '#components/DataTableStatus.svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { Checkbox } from '#lib/components/ui/checkbox/index.ts';
	import { renderComponent } from '#lib/components/ui/data-table/index.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';
	import type { Player } from '#lib/server/database/schema.ts';
	import type { PageProps } from './$types';
	import { schema } from './schema';

	let { data }: PageProps = $props();
	const { players } = $derived(data);

	const emptyPlayer = {
		name: '',
		picture: '',
		isActive: false,
	};

	const playerForm = createForm({
		schema,
		initialInput: emptyPlayer,
	});

	let isModalOpen = $state(false);
	let item: Player | undefined = $state(undefined);

	const columns: ColumnDef<Player>[] = [
		{
			accessorKey: 'name',
			header: 'Nome',
			cell: ({ row }) => {
				return renderComponent(DataTablePlayer, {
					player: row.original,
				});
			},
		},
		{
			accessorKey: 'isActive',
			header: 'Attivo',
			cell: ({ row }) => {
				return renderComponent(DataTableStatus, {
					active: Boolean(row.getValue('isActive')),
				});
			},
		},
		{
			id: 'editAction',
			cell: ({ row }) => {
				return renderComponent(DataTableButton, {
					label: 'Modifica',
					type: 'button',
					variant: 'outline',
					icon: 'PencilLine',
					class: 'cursor-pointer',
					onclick: () => onEditPlayer(row.original),
				});
			},
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const player = row.original;

				return renderComponent(DataTableFormButton, {
					ids: [{ name: 'id', value: player.id }],
					action: '?/delete',
					label: 'Elimina',
					type: 'submit',
					variant: 'destructive',
					icon: 'Trash2',
					class: 'cursor-pointer',
					confirm: { title: `Eliminare il giocatore ${player.name}?` },
				});
			},
		},
	];

	const onEditPlayer = (row: Player) => {
		item = row;
		reset(playerForm, {
			initialInput: {
				id: row.id,
				name: row.name,
				picture: row.picture ?? '',
				isActive: row.isActive,
			},
		});
		isModalOpen = true;
	};

	const createPlayer = () => {
		item = undefined;
		reset(playerForm, { initialInput: emptyPlayer });
		isModalOpen = true;
	};

	const handleSubmit: SubmitHandler<typeof schema> = async (output) => {
		try {
			const result = await postAction('?/update', output);
			if (result.type === 'success') {
				item = undefined;
				isModalOpen = false;
				toast.success('Triplooo! Dati salvati!');
				return;
			}
			if (result.type === 'failure' || result.type === 'error') {
				setErrors(playerForm, {
					errors: [failureMessage(result, 'Qualcosa è andato storto')],
				});
				toast.error("Cita murta! c'è un errore....");
			}
		} catch (error) {
			console.error(error);
			toast.error("Cita murta! c'è un errore....");
		}
	};
</script>

<PageTitle title="Gestione giocatori" showBackButton={true} variant="admin" />

<Main>
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-6 flex justify-end">
			<Button
				type="button"
				size="lg"
				class="h-11 w-full cursor-pointer sm:w-auto"
				onclick={() => createPlayer()}
			>
				<span>Aggiungi giocatore</span>
				<UserRound size="24" />
			</Button>
		</header>

		{#if players.length > 0}
			<DataTable data={players} {columns} />
		{:else}
			<p class="panel px-6 py-12 text-center text-muted-foreground">
				Non ci sono ancora giocatori qua...
			</p>
		{/if}
	</div>
</Main>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{item === undefined
					? 'Nuovo giocatore'
					: 'Modifica giocatore'}</Dialog.Title
			>
		</Dialog.Header>

		<Form of={playerForm} onsubmit={handleSubmit} class="flex flex-col gap-4">
			<Field of={playerForm} path={['name']}>
				{#snippet children(field)}
					<Label for="player-name">Nome</Label>
					<Input
						{...field.props}
						id="player-name"
						type="text"
						placeholder="Inserisci il nome del giocatore"
						value={field.input}
						aria-invalid={!!field.errors}
						aria-errormessage="player-name-error"
					/>
					{#if field.errors}
						<p id="player-name-error" class="text-sm text-destructive">
							{field.errors[0]}
						</p>
					{/if}
				{/snippet}
			</Field>

			<Field of={playerForm} path={['picture']}>
				{#snippet children(field)}
					<Label for="player-picture">Foto (path)</Label>
					<Input
						{...field.props}
						id="player-picture"
						type="text"
						value={field.input ?? ''}
						aria-invalid={!!field.errors}
						aria-errormessage="player-picture-error"
					/>
					{#if field.errors}
						<p id="player-picture-error" class="text-sm text-destructive">
							{field.errors[0]}
						</p>
					{/if}
				{/snippet}
			</Field>

			<Field of={playerForm} path={['isActive']}>
				{#snippet children(field)}
					{@const { oninput, onchange, ...fieldProps } = field.props}
					<div class="flex items-center gap-2">
						<Checkbox
							{...fieldProps}
							id="player-active"
							aria-labelledby="player-active-label"
							aria-invalid={!!field.errors}
							checked={field.input ?? false}
							onCheckedChange={(checked) => {
								if (typeof checked === 'boolean') field.onInput(checked);
							}}
						/>
						<Label id="player-active-label" for="player-active">Attivo</Label>
					</div>
					{#if field.errors}
						<p id="player-active-error" class="text-sm text-destructive">
							{field.errors[0]}
						</p>
					{/if}
				{/snippet}
			</Field>

			<Button type="submit" disabled={playerForm.isSubmitting} class="w-full">
				{playerForm.isSubmitting ? 'Salvataggio...' : 'Conferma'}
			</Button>

			{#if playerForm.errors}
				<div class="mt-3 rounded-md text-red-700">{playerForm.errors[0]}</div>
			{/if}
		</Form>
	</Dialog.Content>
</Dialog.Root>
