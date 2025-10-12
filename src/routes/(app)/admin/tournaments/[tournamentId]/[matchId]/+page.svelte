<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';
	import type { Match, Player, Tournament } from '$lib/server/database/schema';
	import DataTable from '$components/DataTable.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$lib/components/ui/data-table';
	import DataTableButton from '$components/DataTableButton.svelte';
	import type { PlayerExtended } from '$lib/server/repository';
	import { Button } from '$lib/components/ui/button';
	import { PackagePlus } from '@lucide/svelte';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Dice6 } from '@lucide/svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Select from "$lib/components/ui/select";
	import { schema } from './schema';

	let { data }: PageProps = $props();

	const { match, allPlayers, tournament, players } = $derived(data);

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
	let item: PlayerExtended | undefined = $state(undefined);

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

	const onEditPoints = (row: PlayerExtended) => {
		item = row;
		isModalOpen = true;
	};

	const onRemovePlayer = (e, row: PlayerExtended) => {
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

	// Populate form data when item changes
	$effect(() => {
		if (item) {
			$formData.matchId = match.id;
			$formData.playerId = item.id;
			$formData.points = item.points;
		} else {
			$formData.matchId = match.id;
			$formData.playerId = "";
			$formData.points = 0;
		}
	});
</script>

<AdminPageTitle
	title={`${tournament.title}`}
	subtitle={`Gestione punteggi per la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
	showBackButton={true}
/>

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="cursor-pointer" onclick={() => addPlayer()}>
				<span>Aggiungi punteggio</span>
				<Dice6 size="24" />
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
			<input type="hidden" name="matchId" value={$formData.matchId} />

			<Form.Field {form} name="playerId">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Giocatore</Form.Label>
						<Select.Root
							type="single"
							bind:value={$formData.playerId}
							name={props.name}
						>
							<Select.Trigger {...props}>
								{$formData.playerId
									? $formData.playerId
									: "Seleziona un giocatore..."}
							</Select.Trigger>
							<Select.Content>
								{#if item}
									{#each allPlayers as player}
										<Select.Item value={player.id} label={player.name}/>
									{/each}
								{:else}
									{#each allPlayers.filter(p => players.find(x => x.id === p.id) === undefined) as player}
										<Select.Item value={player.id} label={player.name}/>
									{/each}
								{/if}
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mb-4 *:mb-2" />
			</Form.Field>

			<Form.Field {form} name="points">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Punti</Form.Label>
						<Input
						{...props}
						bind:value={$formData.points}
						type="number"
						placeholder="punti"
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
