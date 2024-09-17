<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Player } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, PencilSimple, Trash, UserSquare, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import { AlertDialog } from 'bits-ui';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import Loader from '$components/Loader.svelte';
	import Checkbox from '$components/ui/Form/Checkbox.svelte';
	import { CldUploadWidget, getCldImageUrl } from 'svelte-cloudinary';
	import { fade } from 'svelte/transition';
	import DateInput from '$components/ui/Form/DateInput.svelte';

	type PageProps = {
		players: Array<Player>
	}

	export let data: PageData;

	const { players }: PageProps = data;
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
	let item: Player | undefined = undefined;

	const table = new TableHandler(players, { rowsPerPage: 10 });

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
		console.log('Public ID', results.info.public_id);

		const response = await fetch('/api/player', {
			method: 'POST',
			body: JSON.stringify({ id: row.id, picture: results.info.public_id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const success: boolean = await response.json();
		console.log({ success });
	};

	const createPlayer = () => {
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

<AdminPageTitle title="Gestione giocatori" />
<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => createPlayer()}>
				<span>Nuova partita</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		<Datatable {table}>
			<table class="table">
				<thead>
				<tr>
					<th>Partita</th>
					<th></th>
					<th></th>
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
						<td>
							{#if row.isActive}
								<CheckCircle size="20" />
							{:else}
								<XCircle size="20" />
							{/if}
						</td>
						<td>
							<CldUploadWidget uploadPreset="kfzhcgck"
															 onSuccess={(results) => onEditPlayerPicture(results, row)}
															 let:open
															 let:isLoading>
								<button type="button" class="table-button" on:click={open} disabled={isLoading}>
									<UserSquare size="20" />
								</button>
							</CldUploadWidget>
						</td>
						<td>
							<button type="button" class="table-button" on:click={() => onEditPlayer(row)}>
								<PencilSimple size="20" />
							</button>
						</td>
						<td>
							<form action="?/delete" method="POST" on:submit={(e) => onRemovePlayer(e, row)}>
								<input type='hidden' name='id' value={item?.id} />
								<input type='hidden' name='action' value="delete" />
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
			<input type='hidden' name='id' value={item?.id} />

			<DateInput label='Data partita' name='date'
								 errors={$errors.date}
								 constraints={$constraints.date}
								 invalidMessage={$errors?.date?.join(' - ')}
								 value={item?.date}
			/>

			<div class="modal-actions">
				<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
				<button type="submit" class="button primary">Salva</button>
			</div>
		</form>
	</svelte:fragment>
</Modal>

