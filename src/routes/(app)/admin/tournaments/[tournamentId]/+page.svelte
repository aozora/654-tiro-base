<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$lib/components/ui/data-table';
	import type { Match } from '$lib/server/database/schema';
	import DataTable from '$components/DataTable.svelte';
	import DataTableButton from '$components/DataTableButton.svelte';
	import { PackagePlus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let { data }: PageProps = $props();
	const { tournament, players, matches } = data;

	const { errors, enhance, delayed, message, constraints } = superForm(data.form, {
		invalidateAll: 'force',
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && page.status < 400) {
				item = undefined;
				isModalOpen = false;

				// show a toast
				toast.success({
					title: 'Triplooo!',
					subtitle: 'Dati salvati!',
					showTimestamp: true,
					hideCloseButton: false
				});
			}
		}
	});

	let isModalOpen = false;
	let item: Match | undefined = undefined;

	const columns: ColumnDef<Match>[] = [
		{
			accessorKey: 'date',
			header: 'Data partita',
			cell: ({ row }) => {
				const match = row.original;
				return new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date);
			}
		},
		{
			id: 'editAction',
			cell: ({ row }) => {
				const match = row.original;
				return renderComponent(DataTableButton, {
					label: 'Modifica',
					type: 'button',
					variant: 'outline',
					icon: 'PencilLine',
					class: 'cursor-pointer',
					onclick: onEditMatch(match)
				});
			}
		},
		{
			id: 'editMatchAction',
			cell: ({ row }) => {
				const match = row.original;
				return renderComponent(DataTableButton, {
					label: 'Gestisci',
					type: 'button',
					variant: 'outline',
					icon: 'Dices',
					class: 'cursor-pointer',
					href: `/admin/tournaments/${tournament.id}/${match.id}`
				});
			}
		}
		// {
		// 	id: 'deleteAction',
		// 	cell: ({ row }) => {
		// 		const match = row.original;
		// 		return renderComponent(DataTableActionButton, { variant: 'delete', onclick: onDeleteMatch(match) });
		// 	}
		// },

	];


	const createMatch = () => {
		item = undefined;
		isModalOpen = true;
	};

	const onEditMatch = (row: Player) => {
		item = row;
		isModalOpen = true;
	};

	const onDeleteMatch = (match: Match) => {
		const okDelete = confirm(
			`Elimino la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)} ?`
		);

		if (!okDelete) {
			e.preventDefault();
			return;
		}
	};
</script>

<AdminPageTitle title={`${tournament.title}`} subtitle="Gestione partite" showBackButton={true} />

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="button" onclick={() => createMatch()}>
				<span>Nuova partita</span>
				<PackagePlus size={24} />
			</Button>
		</header>

		{#if matches.length > 0}
			<DataTable data={matches} {columns} />
		{:else}
			<p class="empty-text">Non c'è ancora nessuna partita qua...</p>
		{/if}
	</div>

	{#if $delayed}
		<Loader />
	{/if}

	<!--	<Modal-->
	<!--		title={item === undefined ? 'Nuova partita' : 'Modifica partita'}-->
	<!--		bind:isOpen={isModalOpen}-->
	<!--	>-->
	<!--		<svelte:fragment slot="modal-content">-->
	<!--			<form id="form-player" action="?/update" method="POST">-->
	<!--				<input type="hidden" name="matchId" value={item?.id} />-->
	<!--				<input type="hidden" name="tournamentId" value={tournament.id} />-->
	<!--				<DateInput-->
	<!--					label="Data partita"-->
	<!--					name="date"-->
	<!--					errors={$errors.date}-->
	<!--					constraints={$constraints.date}-->
	<!--					value={item?.date}-->
	<!--				/>-->

	<!--				<div class="modal-actions">-->
	<!--					<button type="button" class="button" on:click={() => (isModalOpen = false)}-->
	<!--					>Annulla-->
	<!--					</button-->
	<!--					>-->
	<!--					<button type="submit" class="button primary">Salva</button>-->
	<!--				</div>-->
	<!--			</form>-->
	<!--		</svelte:fragment>-->
	<!--	</Modal>-->
</Main>
