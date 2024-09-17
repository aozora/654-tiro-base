<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Player } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, Trash, XCircle } from 'phosphor-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import type { TournamentWithPlayers } from '$lib/server/repository';

	type PageProps = {
		players: Array<Player>,
		tournamentWithPlayers: TournamentWithPlayers,
		tournamentId: string
	}

	export let data: PageData;

	const { players, tournamentWithPlayers, tournamentId }: PageProps = data;
	const {
		form,
		enhance,
		delayed,
		message
	} = superForm(data.form, {
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && $page.status < 400) {
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

	let availablePlayers;

	$:availablePlayers = players.filter(p => !tournamentWithPlayers.PlayersOnTournaments.find(x => x.playerId === p.id));

	const table = new TableHandler(tournamentWithPlayers.PlayersOnTournaments, { rowsPerPage: 10 });

	const onRemovePlayerFromTournament = (e, row) => {
		const okDelete = confirm(`Elimino l'utente ${row.player.name} ?`);

		if (!okDelete) {
			e.preventDefault();
			return;
		}

	};
</script>

<AdminPageTitle title={`${tournamentWithPlayers.title}`} subtitle="Gestione giocatori" />
<Main className="admin-page">
	<div>
		<header class="page-header">
			<form action="?/create" method="POST" class="admin-page-header-form" use:enhance>
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
							<form action="?/delete" method="POST" on:submit={(e) => onRemovePlayerFromTournament(e, row)} use:enhance>
								<input type='hidden' name='playerId' value={row.playerId} />
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

