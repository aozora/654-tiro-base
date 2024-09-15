<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Player } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, PencilSimple, UserSquare, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import Toggle from '$components/ui/Form/Toggle.svelte';
	import Avatar from '$components/ui/Avatar/Avatar.svelte';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';

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

	// TODO
	const onEditPlayerPicture = (row: Player) => {
		console.log({ row });
		// item = row;
		// isModalOpen = true;
	};

	const createPlayer = () => {
		item = undefined;
		isModalOpen = true;
	};
</script>

<AdminPageTitle title="Gestione giocatori" />
<Main className="admin-page">

	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => createPlayer()}>
				<span>Aggiungi giocatore</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		<Datatable {table}>
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
				{#each table.rows as row}
					<tr>
						<td>
							<Avatar picture={row.picture} name={row.name} />
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
							<button class="table-button" on:click={() => onEditPlayerPicture(row)}>
								<UserSquare size="20" />
							</button>
						</td>
						<td>
							<button class="table-button" on:click={() => onEditPlayer(row)}>
								<PencilSimple size="20" />
							</button>
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		</Datatable>
	</div>
</Main>

<Modal title={item === undefined ? 'Nuovo giocatore':'Modifica giocatore'}
			 bind:isOpen={isModalOpen}>
	<svelte:fragment slot='modal-content'>
		<form id="form-player" method="POST">
			<input type='hidden' name='id' value={item?.id} />

			<!--      <SuperDebug data={$form} />-->

			<TextInput label='Nome' required={true} name='name'
								 errors={$errors.name}
								 constraints={$constraints.name}
								 invalidMessage={$errors?.name?.join(' - ')}
								 value={item?.name}
			/>
			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive ?? false} />
		</form>
	</svelte:fragment>

	<svelte:fragment slot='modal-actions'>
		<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
		<button type="submit" form="form-player" class="button primary" on:click={()=>isModalOpen = false}>Salva</button>
	</svelte:fragment>
</Modal>
