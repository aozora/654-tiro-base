<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import PageTitle from '$components/PageTitle.svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import type { Match, Tournament } from '$lib/server/database/schema';
	import { toast } from 'svelte-sonner';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import { createRawSnippet } from 'svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$components/DataTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PackagePlus } from '@lucide/svelte';
	import DataTableButton from '$components/DataTableButton.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import DataTableFormButton from '$components/DataTableFormButton.svelte';

	let { data }: PageProps = $props();
	let { tournaments,  } = $derived(data);

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
	let item: Tournament | undefined = $state(undefined);

	const columns: ColumnDef<Tournament>[] = [
		{
			accessorKey: 'title',
			header: 'Titolo torneo'
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
			accessorKey: 'matches',
			header: 'Num. partite giocate',
			cell: ({ row }) => {
				const matches = row.getValue('matches') as Match[];

				return renderSnippet(
					createRawSnippet(() => ({
						render: () => `<span class='text-right font-medium'>${matches.length}</span>`
					}))
				);
			}
		},
		{
			id: 'editAction',
			cell: ({ row }) => {
				const tournament = row.original;
				return renderComponent(DataTableButton, {
					label: 'Rinomina',
					type: 'button',
					variant: 'outline',
					icon: 'PencilLine',
					class: 'cursor-pointer',
					onclick: () => onEditTournament(tournament)
				});
			}
		},
		{
			id: 'matchesAction',
			cell: ({ row }) => {
				const tournament = row.original;
				return renderComponent(DataTableButton, {
					label: 'Gestisci',
					type: 'button',
					variant: 'outline',
					icon: 'Dices',
					class: 'cursor-pointer',
					href: `/admin/tournaments/${tournament.id}`
				});
			}
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const tournament = row.original;
				const matches = row.getValue('matches') as Match[];
				if (matches.length === 0) {
					return renderComponent(DataTableFormButton, {
						ids: [{ name: 'id', value: tournament.id }],
						enhance: enhance,
						action: '?/delete',
						label: 'Elimina',
						type: 'submit',
						variant: 'destructive',
						icon: 'Trash2',
						class: 'cursor-pointer'
					});
				}

				return null;
			}
		}
	];

	const onEditTournament = (row: Tournament) => {
		item = row;
		isModalOpen = true;
	};

	const createTournament = () => {
		item = undefined;
		isModalOpen = true;
	};

	// Populate form data when item changes
	$effect(() => {
		if (item) {
			$formData.id = item.id;
			$formData.title = item.title;
			$formData.isActive = item.isActive;
		} else {
			$formData.id = undefined;
			$formData.title = '';
			$formData.isActive = false;
		}
	});
</script>

<PageTitle title="Gestione tornei" showBackButton={true} variant="admin" />

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="cursor-pointer" onclick={() => createTournament()}>
				<span>Nuovo torneo</span>
				<PackagePlus size={24} />
			</Button>
		</header>

		<DataTable data={tournaments} {columns} />
	</div>
</Main>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{item === undefined ? 'Nuovo torneo' : 'Modifica torneo'}</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/update" use:enhance>
			<input type="hidden" name="id" value={item?.id} />

			<Form.Field {form} name="title">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Titolo</Form.Label>
						<Input
							{...props}
							bind:value={$formData.title}
							type="text"
							placeholder="Inserisci il titolo del torneo..."
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
