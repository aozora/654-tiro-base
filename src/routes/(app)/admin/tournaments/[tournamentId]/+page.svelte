<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, DataHandler } from '@vincjo/datatables';
	import type { Match, Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import { DiceThree, PencilSimple, Trash } from 'phosphor-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import DateInput from '$components/ui/Form/DateInput.svelte';
	import { Icons } from '$types';
	import Icon from '$components/Icon/Icon.svelte';

	type PageProps = {
		tournament: Tournament,
		players: Array<Player>,
		matches: Array<Match>
	}

	export let data: PageData;
	const {
		tournament,
		players,
		matches
	}: PageProps = data;

	const {
		errors,
		enhance,
		delayed,
		message,
		constraints
	} = superForm(data.form, {
		invalidateAll: 'force',
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && $page.status < 400) {
				item = undefined;
				isModalOpen = false;

				// show a toast
				toast({
					kind: 'success',
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

	const tableHanlder = new DataHandler(matches, { rowsPerPage: 10 });
	const table = tableHanlder.getRows();

	const createMatch = () => {
		item = undefined;
		isModalOpen = true;
	};


	const onEditMatch = (row: Player) => {
		item = row;
		isModalOpen = true;
	};

	const onDeleteMatch = (e, row) => {
		const okDelete = confirm(`Elimino la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(row.date)} ?`);

		if (!okDelete) {
			e.preventDefault();
			return;
		}
	};
</script>

<AdminPageTitle title={`${tournament.title}`} subtitle="Gestione partite" showBackButton={true} />

<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => createMatch()}>
				<span>Nuova partita</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		{#if matches.length > 0}
			<Datatable handler={tableHanlder}>
				<table class="table">
					<thead>
					<tr>
						<th>Data partita</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{#each $table as row}
						<tr>
							<td>
							<span>
								{new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(row.date)}
							</span>
							</td>
							<td>
								<button type="button" class="table-button" on:click={() => onEditMatch(row)}>
									<PencilSimple size="20" />
								</button>
							</td>
							<td>
								<a href={`/admin/tournaments/${tournament.id}/${row.id}`} class="table-button">
									<DiceThree size="20" />
								</a>
							</td>
							<td>
								<form action="?/delete" method="POST" on:submit={(e) => onDeleteMatch(e, row)} use:enhance>
									<input type='hidden' name='matchId' value={row.id} />
									<input type='hidden' name='tournamentId' value={row.tournamentId} />

									<button type="submit" class="table-button">
										<Trash size="20" />
									</button>
								</form>
							</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</Datatable>
		{:else}
			<p class="empty-text">Non c'è ancora nessuna partita qua...</p>
		{/if}
	</div>

	{#if $delayed}
		<Loader />
	{/if}

	<Modal title={item === undefined ? 'Nuova partita':'Modifica partita'}
				 bind:isOpen={isModalOpen}>
		<svelte:fragment slot='modal-content'>
			<form id="form-player" action="?/update" method="POST" use:enhance>
				<input type='hidden' name='matchId' value={item?.id} />
				<input type='hidden' name='tournamentId' value={tournament.id} />

				<DateInput label='Data partita' name='date'
									 errors={$errors.date}
									 constraints={$constraints.date}
									 value={item?.date}
				/>

				<div class="modal-actions">
					<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
					<button type="submit" class="button primary">Salva</button>
				</div>
			</form>
		</svelte:fragment>
	</Modal>

</Main>

<style lang="scss">
  .admin-page-header-form {

    //div {
    //  display: flex;
    //  justify-content: space-between;
    //  align-items: center;
    //  gap: .5rem;
    //}
    //
    //select {
    //  flex: 1 1 auto;
    //}
    //
    //button {
    //  flex: 0 0 auto;
    //}
  }
</style>

