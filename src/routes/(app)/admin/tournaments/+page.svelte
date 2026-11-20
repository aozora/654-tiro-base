<script lang="ts">
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import type { PageProps } from './$types';
	import type { Match, Tournament } from '#lib/server/database/schema.ts';
	import { toast } from 'svelte-sonner';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent, renderSnippet } from '#lib/components/ui/data-table/index.js';
	import { createRawSnippet } from 'svelte';
	import DataTable from '#components/DataTable.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { PackagePlus } from '@lucide/svelte';
	import DataTableButton from '#components/DataTableButton.svelte';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { schema } from './schema';
	import { Checkbox } from '#lib/components/ui/checkbox/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import DataTableFormButton from '#components/DataTableFormButton.svelte';
	import { createForm, Field, Form, reset, setErrors, type SubmitHandler } from '@formisch/svelte';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';

	let { data }: PageProps = $props();
	let { tournaments } = $derived(data);

	const emptyTournament = {
		title: '',
		isActive: false
	};

	const tournamentForm = createForm({
		schema,
		initialInput: emptyTournament
	});

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
						render: () => (isActive ? `<span>Yes</span>` : `<span>No</span>`)
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
		reset(tournamentForm, {
			initialInput: {
				id: row.id,
				title: row.title,
				isActive: row.isActive
			}
		});
		isModalOpen = true;
	};

	const createTournament = () => {
		item = undefined;
		reset(tournamentForm, { initialInput: emptyTournament });
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
				setErrors(tournamentForm, {
					errors: [failureMessage(result, 'Qualcosa è andato storto')]
				});
				toast.error("Cita murta! c'è un errore....");
			}
		} catch (error) {
			console.error(error);
			toast.error("Cita murta! c'è un errore....");
		}
	};
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

		<Form of={tournamentForm} onsubmit={handleSubmit} class="flex flex-col gap-4">
			<Field of={tournamentForm} path={['title']}>
				{#snippet children(field)}
					<Label for="tournament-title">Titolo</Label>
					<Input
						{...field.props}
						id="tournament-title"
						type="text"
						placeholder="Inserisci il titolo del torneo..."
						value={field.input}
						aria-invalid={!!field.errors}
						aria-errormessage="tournament-title-error"
					/>
					{#if field.errors}
						<p id="tournament-title-error" class="text-sm text-destructive">{field.errors[0]}</p>
					{/if}
				{/snippet}
			</Field>

			<Field of={tournamentForm} path={['isActive']}>
				{#snippet children(field)}
					{@const { oninput, onchange, ...fieldProps } = field.props}
					<div class="flex items-center gap-2">
						<Checkbox
							{...fieldProps}
							id="tournament-active"
							aria-labelledby="tournament-active-label"
							aria-invalid={!!field.errors}
							checked={field.input ?? false}
							onCheckedChange={(checked) => {
								if (typeof checked === 'boolean') field.onInput(checked);
							}}
						/>
						<Label id="tournament-active-label" for="tournament-active">Attivo</Label>
					</div>
					{#if field.errors}
						<p class="text-sm text-destructive">{field.errors[0]}</p>
					{/if}
				{/snippet}
			</Field>

			<Button type="submit" disabled={tournamentForm.isSubmitting} class="w-full">
				{tournamentForm.isSubmitting ? 'Salvataggio...' : 'Conferma'}
			</Button>

			{#if tournamentForm.errors}
				<div class="mt-3 rounded-md text-red-700">{tournamentForm.errors[0]}</div>
			{/if}
		</Form>
	</Dialog.Content>
</Dialog.Root>
