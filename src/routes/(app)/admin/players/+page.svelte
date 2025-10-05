<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Player } from '$lib/server/db';
	import type { PageData } from './$types';
	// import { CheckCircle, PencilSimple, Trash, UserSquare, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import Loader from '$components/Loader.svelte';
	import Checkbox from '$components/ui/Form/Checkbox.svelte';

	type PageProps = {
		players: Array<Player>;
	};

	export let data: PageData;

	const { players }: PageProps = data;
	const { form, errors, enhance, delayed, message, constraints } = superForm(data.form, {
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
	let isUploadWidgetOpen = false;
	let item: Player | undefined = undefined;

	const tableHanlder = new TableHandler(players, { rowsPerPage: 10 });
	const table = tableHanlder.getRows();

	const onEditPlayer = (row: Player) => {
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

	const onEditPlayerPicture = async (results, row: Player) => {
		console.log({ row });
		// console.log('Public ID', results.info.public_id);

		const response = await fetch('/api/player', {
			method: 'POST',
			body: JSON.stringify({ id: row.id, picture: results.info.public_id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const success: boolean = await response.json();
		return success;
	};

	const createPlayer = () => {
		item = undefined;
		isModalOpen = true;
	};
</script>

<AdminPageTitle title="Gestione giocatori" showBackButton={true} />

<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => createPlayer()}>
				<span>Aggiungi giocatore</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		{#if table}
			<Datatable table={tableHanlder}>
				<table class="table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Attivo</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{#each $table as row}
							<tr>
								<td class="player-info">
									<Avatar picture={row.picture || ''} name={row.name} />
									<span>{row.name}</span>
								</td>
								<td>
									{#if row.isActive}
										<CheckCircle size="20" />
									{:else}
										<XCircle size="20" />
									{/if}
								</td>
								<td>
									<button type="button" class="table-button" on:click={() => onEditPlayer(row)}>
										<PencilSimple size="20" />
									</button>
								</td>
								<td>
									<form action="?/delete" method="POST" on:submit={(e) => onRemovePlayer(e, row)}>
										<input type="hidden" name="id" value={row.id} />
										<input type="hidden" name="action" value="delete" />
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
		{/if}
	</div>

	{#if $delayed}
		<Loader />
	{/if}
</Main>

<Modal
	title={item === undefined ? 'Nuovo giocatore' : 'Modifica giocatore'}
	bind:isOpen={isModalOpen}
>
	<svelte:fragment slot="modal-content">
		<form id="form-player" action="?/update" method="POST" use:enhance>
			<input type="hidden" name="id" value={item?.id} />

			<TextInput
				label="Nome"
				name="name"
				errors={$errors.name}
				constraints={$constraints.name}
				value={item?.name}
			/>
			<TextInput
				label="Foto (path)"
				name="picture"
				errors={$errors.name}
				constraints={$constraints.name}
				value={item?.picture}
			/>
			<!--			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive ?? false} />-->
			<Checkbox
				label="Attivo"
				required={true}
				name="isActive"
				errors={$errors.isActive}
				constraints={$constraints.isActive}
				checked={item?.isActive}
			/>

			<div class="modal-actions">
				<button type="button" class="button" on:click={() => (isModalOpen = false)}>Annulla</button>
				<button type="submit" class="button primary">Salva</button>
			</div>
		</form>
	</svelte:fragment>
</Modal>
