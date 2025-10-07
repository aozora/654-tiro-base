<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import Loader from '$components/Loader.svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import type { Match, Tournament } from '$lib/server/database/schema';
	import { toast } from 'svelte-sonner';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import { createRawSnippet } from 'svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableActionButton from '$components/DataTableActionButton.svelte';
	import DataTable from '$components/DataTable.svelte';

	let { data }: PageProps = $props();
	let { tournaments } = data;

	const { form, errors, enhance, delayed, message, constraints } = superForm(data.form, {
		// validationMethod: 'onsubmit', //'auto' | 'oninput' | 'onblur' | 'onsubmit' = 'auto',
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && page.status < 400) {
				item = undefined;
				isModalOpen = false;

				// show a toast
				toast.success({
					// kind: 'success',
					message: 'Triplooo! Dati salvati!',
					showTimestamp: true,
					hideCloseButton: false
				});
			}
		}
	});

	let isModalOpen = false;
	let item: Tournament | undefined = undefined;

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
				return renderComponent(DataTableActionButton, { variant: 'edit', onclick: onEditTournament(tournament) });
			}
		},
		{
			id: 'matchesAction',
			cell: ({ row }) => {
				const tournament = row.original;
				return renderComponent(DataTableActionButton, {
					variant: 'dices',
					href: `/admin/tournaments/${tournament.id}`,
					onclick: undefined
				});
			}
		}
	];


	const onEditTournament = (row: Tournament) => {
		// console.log({ row });
		item = row;
		isModalOpen = true;
	};

	const createTournament = () => {
		item = undefined;
		isModalOpen = true;
	};
</script>

<AdminPageTitle title="Gestione tornei" showBackButton={true} />

<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" onclick={() => createTournament()}>
				<span>Nuovo torneo</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		<DataTable data={tournaments} {columns} />
	</div>

	{#if $delayed}
		<Loader />
	{/if}
</Main>

<!--<Modal title={item === undefined ? 'Nuovo torneo' : 'Modifica torneo'} bind:isOpen={isModalOpen}>-->
<!--	<svelte:fragment slot="modal-content">-->
<!--		<form id="form-player" method="POST">-->
<!--			<input type="hidden" name="id" value={item?.id} />-->

<!--			<TextInput-->
<!--				label="Titolo"-->
<!--				name="title"-->
<!--				errors={$errors.title}-->
<!--				constraints={$constraints.title}-->
<!--				value={item?.title}-->
<!--			/>-->
<!--			&lt;!&ndash;			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive ?? false} />&ndash;&gt;-->
<!--			<Checkbox-->
<!--				label="Attivo"-->
<!--				required={false}-->
<!--				name="isActive"-->
<!--				errors={$errors.isActive}-->
<!--				constraints={$constraints.isActive}-->
<!--				checked={item?.isActive}-->
<!--			/>-->

<!--			<div class="modal-actions">-->
<!--				<button type="button" class="button" on:click={() => (isModalOpen = false)}>Annulla</button>-->
<!--				<button type="submit" class="button primary">Salva</button>-->
<!--			</div>-->
<!--		</form>-->
<!--	</svelte:fragment>-->
<!--</Modal>-->
