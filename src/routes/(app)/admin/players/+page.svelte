<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import PageTitle from '$components/PageTitle.svelte';
	import { UserRound } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { Player } from '$lib/server/database/schema';
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$components/DataTable.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
	import DataTableButton from '$components/DataTableButton.svelte';
	import DataTableFormButton from '$components/DataTableFormButton.svelte';
	import { createRawSnippet } from 'svelte';
	import DataTablePlayer from '$components/DataTablePlayer.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { schema } from './schema';

	let { data }: PageProps = $props();
	const { players } = $derived(data);

	let form = $derived(
		superForm(data.form, {
			validators: valibotClient(schema),
			dataType: 'json',
			onUpdated: ({ form }) => {
				// When the form is successfully submitted close the modal and reset the item variable
				if (form.valid && form.message && page.status < 400) {
					item = undefined;
					isModalOpen = false;

					// show a toast
					toast.success('Triplooo! Dati salvati!');
				} else {
					toast.error('Cita murta! c\'è un errore....');
				}
			}
		})
	);
	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);

	let isModalOpen = $state(false);
	let item: Player | undefined = $state(undefined);

	const columns: ColumnDef<Player>[] = [
		{
			accessorKey: 'name',
			header: 'Nome',
			cell: ({ row }) => {
				return renderComponent(DataTablePlayer, {
					player: row.original
				});
			}
		},
		{
			accessorKey: 'isActive',
			header: 'Attivo',
			cell: ({ row }) => {
				const isActive = Boolean(row.getValue('isActive'));

				return renderSnippet(
					createRawSnippet(() => ({
						render: () => isActive ? `<span>Yes</span>` : `<span>No</span>`
					}))
				);
			}
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
					onclick: () => onEditPlayer(row.original)
				});
			}
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const player = row.original;

				return renderComponent(DataTableFormButton, {
					ids: [
						{ name: 'id', value: player.id }
					],
					enhance: enhance,
					action: '?/delete',
					label: 'Elimina',
					type: 'submit',
					variant: 'destructive',
					icon: 'Trash2',
					class: 'cursor-pointer',
					onSubmit: (e) => {
						const okDelete = confirm(
							`Elimino il giocatore ${player.name}?`
						);

						if (!okDelete) {
							e.preventDefault();
							return;
						}
					}
				});
			}
		}
	];

	const onEditPlayer = (row: Player) => {
		item = row;
		isModalOpen = true;
	};

	const createPlayer = () => {
		item = undefined;
		isModalOpen = true;
	};

	// Populate form data when item changes
	$effect(() => {
		if (item) {
			$formData.id = item.id;
			$formData.name = item.name;
			$formData.picture = item.picture ?? undefined;
			$formData.isActive = item.isActive;
		} else {
			$formData.id = undefined;
			$formData.name = '';
			$formData.picture = undefined;
			$formData.isActive = false;
		}
	});
</script>

<PageTitle title="Gestione giocatori" showBackButton={true} variant="admin" />

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="cursor-pointer" onclick={() => createPlayer()}>
				<span>Aggiungi giocatore</span>
				<UserRound size="24" />
			</Button>
		</header>

		{#if players.length > 0}
			<DataTable data={players} {columns} />
		{:else}
			<p class="">Non ci sono ancora giocatori qua...</p>
		{/if}
	</div>
</Main>


<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{item === undefined ? 'Nuovo giocatore' : 'Modifica giocatore'}</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/update" use:enhance>
			<input type="hidden" name="id" value={$formData.id} />

			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Nome</Form.Label>
						<Input
							{...props}
							bind:value={$formData.name}
							type="text"
							placeholder="Inserisci il nome del giocatore"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mb-4 *:mb-2" />
			</Form.Field>

			<Form.Field {form} name="picture">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Foto (path)</Form.Label>
						<Input
							{...props}
							bind:value={$formData.picture}
							type="text"
							placeholder=""
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mb-4 *:mb-2" />
			</Form.Field>

			<Form.Field {form} name="isActive">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Attivo</Form.Label>
						<Checkbox
							{...props}
							bind:checked={$formData.isActive}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mb-4 *:mb-2" />
			</Form.Field>

			<Form.Button disabled={$submitting} class="w-full">
				{$submitting ? 'Salvataggio...' : 'Conferma'}
			</Form.Button>

			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700">
					{$errors?._errors}
				</div>
			{/if}
		</form>

	</Dialog.Content>
</Dialog.Root>
