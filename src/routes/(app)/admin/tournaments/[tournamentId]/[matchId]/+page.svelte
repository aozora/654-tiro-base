<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Match, Player, Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, PencilSimple, Ranking, Trash, UserSquare, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import Loader from '$components/Loader.svelte';
	import { getCldImageUrl } from 'svelte-cloudinary';
	import type { PlayerExtended } from '$lib/server/repository';
	import Select from '$components/ui/Form/Select.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import NumberInput from '$components/ui/Form/NumberInput.svelte';

	type PageProps = {
		match: Match;
		allPlayers: Array<Player>
		players: Array<PlayerExtended>
		tournament: Tournament
	}

	export let data: PageData;

	const { match, allPlayers, tournament, players }: PageProps = data;
	const {
		form,
		errors,
		enhance,
		delayed,
		message,
		constraints
	} = superForm(data.form, {
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
	let item: Player | undefined = undefined;

	const table = new TableHandler(players, { rowsPerPage: 10 });

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

	const getPictureUrl = (publicId: string) => {
		return getCldImageUrl({
			width: 64,
			height: 64,
			src: publicId
		});
	};
</script>

<AdminPageTitle title={`${tournament.title}`}
								subtitle={`Gestione punteggi per la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
								showBackButton={true} />

<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => addPlayer()}>
				<span>Aggiungi punteggio</span>
				<Ranking size="20" />
			</button>
		</header>

		<Datatable {table}>
			<table class="table">
				<thead>
				<tr>
					<th>Giocatore</th>
					<th>Punti</th>
					<th></th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{#each table.rows as row}
					<tr>
						<td>
							<Avatar picture={row.picture ? getPictureUrl(row.picture) : undefined} name={row.name} />
							<span>{row.name}</span>
						</td>
						<td>{row.points}</td>
						<td>
							<button type="button" class="table-button" on:click={() => onEditPoints(row)}>
								<Ranking size="20" />
							</button>
						</td>
						<td>
							<form action="?/delete" method="POST" on:submit={(e) => onRemovePlayer(e, row)}>
								<input type='hidden' name='playerId' value={item?.id} />
								<input type='hidden' name='matchId' value={match.id} />
								<button type="submit"
												class="table-button">
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

<Modal title={item === undefined ? 'Nuovo giocatore':'Modifica giocatore'}
			 bind:isOpen={isModalOpen}>
	<svelte:fragment slot='modal-content'>
		<form id="form-player" action="?/update" method="POST" use:enhance>
			<input type='hidden' name='matchId' value={match.id} />

			<Select label='Giocatore' name='playerId'
							errors={$errors.id}
							constraints={$constraints.id}
							value={item?.id}>
				<option></option>
				{#each allPlayers.filter(p => players.find(x => x.id === p.id) === undefined) as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</Select>

			<NumberInput label='Punti' name='points'
									 min={0}
									 max={100}
									 errors={$errors.points}
									 constraints={$constraints.points}
									 value={item?.points} />

			<div class="modal-actions">
				<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
				<button type="submit" class="button primary">Salva</button>
			</div>
		</form>
	</svelte:fragment>
</Modal>

