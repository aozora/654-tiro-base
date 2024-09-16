<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, PencilSimple, UserCirclePlus, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import type { TournamentWithPlayers } from '$lib/server/repository';

	type PageProps = {
		players: Array<Player>,
		tournamentWithPlayers: TournamentWithPlayers,
		tournamentId:string
	}

	export let data: PageData;

	const { players, tournamentWithPlayers, tournamentId }: PageProps = data;
	const {
		form,
		errors,
		enhance,
		delayed,
		message,
		constraints
	} = superForm(data.form, {
		// validationMethod: 'onsubmit', //'auto' | 'oninput' | 'onblur' | 'onsubmit' = 'auto',
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
	let item: Tournament | undefined = undefined;

	let availablePlayers;

	$:availablePlayers = players.filter(p => !tournamentWithPlayers.PlayersOnTournaments.find(x => x.playerId === p.id));

	const table = new TableHandler(tournamentWithPlayers.PlayersOnTournaments, { rowsPerPage: 10 });
</script>

<AdminPageTitle title={`${tournamentWithPlayers.title}`} subtitle="Gestione giocatori" />
<Main className="admin-page">
	<div>
		<header class="page-header">
			<form method="POST" class="admin-page-header-form">
				<input type="hidden" name="id" value={tournamentId}>
				<label for="select-player">Giocatore</label>
				<div>
					<select id="select-player" name="player" required>
						<option></option>
						{#each availablePlayers as player}
							<option value={player.id}>{player.name}</option>
						{/each}
					</select>
					<button type="submit" class="button primary">Aggiungi</button>
				</div>
			</form>
		</header>

		<Datatable {table}>
			<table class="table">
				<thead>
				<tr>
					<th>Giocatore</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{#each table.rows as row}
					<tr>
						<td>
							<span>{row.player.name}</span>
						</td>
						<td>
							{#if row.isActive}
								<CheckCircle size="20" />
							{:else}
								<XCircle size="20" />
							{/if}
						</td>
						<td>
							<button type="button" class="table-button" on:click={() => onEditTournament(row)}>
								<PencilSimple size="20" />
							</button>
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		</Datatable>
	</div>

	{#if $delayed}
		<Loader />
	{/if}
</Main>

<style lang="scss">
  .admin-page-header-form {

		div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: .5rem;
		}

    select {
      flex: 1 1 auto;
    }

    button {
      flex: 0 0 auto;
    }
  }
</style>

