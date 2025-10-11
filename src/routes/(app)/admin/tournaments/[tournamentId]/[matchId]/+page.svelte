<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';
	import type { Match, Player } from '$lib/server/database/schema';
	import DataTable from '$components/DataTable.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$lib/components/ui/data-table';
	import DataTableButton from '$components/DataTableButton.svelte';
	import type { PlayerExtended } from '$lib/server/repository';
	import { Button } from '$lib/components/ui/button';
	import { PackagePlus } from '@lucide/svelte';

	let { data }: PageProps = $props();

	const { match, allPlayers, tournament, players } = data;
	const { form, errors, enhance, delayed, message, constraints } = superForm(data.form, {
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && page.status < 400) {
				item = undefined;
				isModalOpen = false;

				// show a toast
				toast.success('Triplooo! Dati salvati!');
			}
		}
	});

	let isModalOpen = false;
	let item: Player | undefined = undefined;


	const columns: ColumnDef<PlayerExtended>[] = [
		{
			accessorKey: 'name',
			header: 'Giocatore'
		},
		{
			accessorKey: 'points',
			header: 'Punti'
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
					onclick: () => onEditPoints(row.original)
				});
			}
		}
		// {
		// 	id: 'editMatchAction',
		// 	cell: ({ row }) => {
		// 		const tournament = row.original;
		// 		return renderComponent(DataTableButton, {
		// 			type: 'button',
		// 			variant: 'outline',
		// 			icon: "Dices",
		// 			class: 'cursor-pointer',
		// 			href: `/admin/tournaments/${tournament.id}/${row.original.id}`,
		// 		});
		// 	}
		// },
		// {
		// 	id: 'deleteAction',
		// 	cell: ({ row }) => {
		// 		const match = row.original;
		// 		return renderComponent(DataTableActionButton, { variant: 'delete', onclick: onDeleteMatch(match) });
		// 	}
		// },

	];

	const onEditPoints = (row: Player) => {
		// console.log({ row });
		item = row;
		isModalOpen = true;
	};

	const onRemovePlayer = (e, row: Player) => {
		const okDelete = confirm(`Elimino l'utente ${row.name} ?`);

		if (!okDelete) {
			e.preventDefault();
			return;
		}
	};

	const addPlayer = () => {
		item = undefined;
		isModalOpen = true;
	};
</script>

<AdminPageTitle
	title={`${tournament.title}`}
	subtitle={`Gestione punteggi per la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
	showBackButton={true}
/>

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="button" onclick={() => addPlayer()}>
				<span>Aggiungi punteggio</span>
			</Button>
		</header>

		<DataTable data={players} {columns} />
	</div>

	{#if $delayed}
		<Loader />
	{/if}
</Main>

<!--<Modal-->
<!--	title={item === undefined ? 'Nuovo giocatore' : 'Modifica giocatore'}-->
<!--	bind:isOpen={isModalOpen}-->
<!--&gt;-->
<!--	<svelte:fragment slot="modal-content">-->
<!--		<form id="form-player" action="?/update" method="POST">-->
<!--			<input type="hidden" name="matchId" value={match.id} />-->

<!--			<Select-->
<!--				label="Giocatore"-->
<!--				name="playerId"-->
<!--				errors={$errors.id}-->
<!--				constraints={$constraints.id}-->
<!--				value={item?.id}-->
<!--			>-->
<!--				<option></option>-->
<!--				{#if item}-->
<!--					{#each allPlayers as player}-->
<!--						<option value={player.id}>{player.name}</option>-->
<!--					{/each}-->
<!--				{:else}-->
<!--					{#each allPlayers.filter((p) => players.find((x) => x.id === p.id) === undefined) as player}-->
<!--						<option value={player.id}>{player.name}</option>-->
<!--					{/each}-->
<!--				{/if}-->
<!--			</Select>-->

<!--			<NumberInput-->
<!--				label="Punti"-->
<!--				name="points"-->
<!--				min={0}-->
<!--				max={100}-->
<!--				errors={$errors.points}-->
<!--				constraints={$constraints.points}-->
<!--				value={item?.points}-->
<!--			/>-->

<!--			<div class="modal-actions">-->
<!--				<button type="button" class="button" on:click={() => (isModalOpen = false)}>Annulla</button>-->
<!--				<button type="submit" class="button primary">Salva</button>-->
<!--			</div>-->
<!--		</form>-->
<!--	</svelte:fragment>-->
<!--</Modal>-->
