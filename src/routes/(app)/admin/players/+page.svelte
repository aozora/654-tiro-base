<script lang="ts">
import Main from '$components/Main.svelte';
import { TableHandler, Datatable, Th } from '@vincjo/datatables'
import type { Player } from '@prisma/client';
import type { PageData } from './$types';
import {PencilSimple} from 'phosphor-svelte'
import Modal from '$components/ui/Modal/Modal.svelte';
import TextInput from '$components/ui/Form/TextInput.svelte';
import { superForm } from 'sveltekit-superforms/client';
import { page } from '$app/stores';
import { toast } from '$lib/toast';

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
			toast({ kind: 'success', title: 'Ok!', subtitle: 'Dati salvati!', showTimestamp: true, hideCloseButton: false });
		}
	}
});

let isModalOpen = false;
let item: Player | undefined = undefined;


const table = new TableHandler(players, { rowsPerPage: 10 })
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
						<button class="button">
							<PencilSimple size="24"/>
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
			<TextInput label='Trustee' name='trustee' value={item?.trustee} />
			<TextInput label='Status' name='status' value={item?.status} />
			<Toggle label='Is external' name='isExternal' required={true} value={item?.isExternal} />
			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive} />

			<Combobox id='select-team' name='team' required={true} label='Team' options={teamsItems} value={item?.teamId}
								placeholder='' />
			<Combobox id='select-city' name='city' required={true} label='City' options={cityItems} value={item?.cityId}
								placeholder='' />
			<Combobox id='select-rate' name='rate' required={true} label='Rate' options={rateItems} value={item?.rateId}
								placeholder='' />

			<TextInput label='Competence' name='competence' value={item?.competence} />
			<TextArea label='Notes' name='notes' value={item?.notes} />
		</form>
	</svelte:fragment>

	<svelte:fragment slot='modal-actions'>
		<Button
			label='Cancel'
			kind='secondary'
			size='extra'
			class='cb-modal-action'
			on:click={() => isModalOpen = false}
		/>
		<Button
			label='Save'
			type='submit'
			kind='primary'
			size='extra'
			class='cb-modal-action'
			form='form-people'
		/>
	</svelte:fragment>
</Modal>
