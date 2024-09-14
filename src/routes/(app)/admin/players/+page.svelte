<script lang="ts">
	import Main from '$components/Main.svelte';
	import { TableHandler, Datatable, Th } from '@vincjo/datatables';
	import type { Player } from '@prisma/client';
	import type { PageData } from './$types';
	import { PencilSimple } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import Toggle from '$components/ui/Form/Toggle.svelte';

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
					title: 'Ok!',
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

	const onNewPlayern = () => {
		item = undefined;
		isModalOpen = true;
	};

	const onEditPlayer = (row: Player) => {
		item = row;
		isModalOpen = true;
	};

</script>

<Main className="admin-page">

	<h1>Gestione giocatori</h1>

	<Datatable basic {table}>
		<table>
			<thead>
			<tr>
				<Th>Nome</Th>
				<Th>Foto</Th>
				<Th>Attivo</Th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{#each table.rows as row}
				<tr>
					<td>{row.name}</td>
					<td>{row.picture}</td>
					<td>{row.isActive}</td>
					<td>
						<button class="button" on:click={() => onEditPlayer(row)}>
							<PencilSimple size="24" />
						</button>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</Datatable>
</Main>

<Modal title={item ? 'Nuovo giocatore':'Modifica giocatore'}
			 bind:isOpen={isModalOpen}>
	<svelte:fragment slot='modal-content'>
		<form id="form-players" method="POST" class="">
			<input type='hidden' name='id' value={item?.id} />

			<!--      <SuperDebug data={$form} />-->

			<!--      value={item?.name}-->
			<TextInput label='Nome' required={true} name='name'
								 errors={$errors.name}
								 constraints={$constraints.name}
								 invalidMessage={$errors?.name?.join(' - ')}
								 value={item?.name}
			/>
			<TextInput label='Foto' name='picture' value={item?.picture} />
			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive} />
		</form>
	</svelte:fragment>

	<svelte:fragment slot='modal-actions'>
		<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
		<button type="submit" form="form-player" class="button primary" on:click={()=>isModalOpen = false}>Salva</button>
		<!--		<Button-->
		<!--			label='Cancel'-->
		<!--			kind='secondary'-->
		<!--			size='extra'-->
		<!--			class='cb-modal-action'-->
		<!--			on:click={() => isModalOpen = false}-->
		<!--		/>-->
		<!--		<Button-->
		<!--			label='Save'-->
		<!--			type='submit'-->
		<!--			kind='primary'-->
		<!--			size='extra'-->
		<!--			class='cb-modal-action'-->
		<!--			form='form-people'-->
		<!--		/>-->
	</svelte:fragment>
</Modal>
