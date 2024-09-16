<script lang="ts">
	import Main from '$components/Main.svelte';
	import { Datatable, TableHandler } from '@vincjo/datatables';
	import type { Tournament } from '@prisma/client';
	import type { PageData } from './$types';
	import { CheckCircle, PencilSimple, UsersThree, XCircle } from 'phosphor-svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import TextInput from '$components/ui/Form/TextInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import { toast } from '$lib/toast';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { Icons } from '$types';
	import Loader from '$components/Loader.svelte';
	import Checkbox from '$components/ui/Form/Checkbox.svelte';

	type PageProps = {
		tournaments: Array<Tournament>
	}

	export let data: PageData;

	const { tournaments }: PageProps = data;
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

	const table = new TableHandler(tournaments, { rowsPerPage: 10 });

	const onEditTournament = (row: Tournament) => {
		// console.log({ row });
		item = row;
		isModalOpen = true;
	};

	const createTournament = () => {
		item = undefined;
		isModalOpen = true;
	};
</script>

<AdminPageTitle title="Gestione tornei" />
<Main className="admin-page">
	<div>
		<header class="page-header">
			<button type="button" class="button" on:click={() => createTournament()}>
				<span>Nuovo torneo</span>
				<Icon id={Icons.TankBrand} />
			</button>
		</header>

		<Datatable {table}>
			<table class="table">
				<thead>
				<tr>
					<th>Titolo</th>
					<th>Attivo</th>
					<th></th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{#each table.rows as row}
					<tr>
						<td>
							<span>{row.title}</span>
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
						<td>
							<a href={`/admin/tournaments/${row.id}`} class="table-button">
								<UsersThree size="20" />
							</a>
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

<Modal title={item === undefined ? 'Nuovo torneo':'Modifica torneo'}
			 bind:isOpen={isModalOpen}>
	<svelte:fragment slot='modal-content'>
		<form id="form-player" method="POST" use:enhance>
			<input type='hidden' name='id' value={item?.id} />

			<TextInput label='Titolo' name='title'
								 errors={$errors.title}
								 constraints={$constraints.title}
								 invalidMessage={$errors?.title?.join(' - ')}
								 value={item?.title}
			/>
			<!--			<Toggle label='Is active' name='isActive' required={true} value={item?.isActive ?? false} />-->
			<Checkbox label='Attivo' required={true} name='isActive'
								errors={$errors.isActive}
								constraints={$constraints.isActive}
								invalidMessage={$errors?.isActive?.join(' - ')}
								checked={item?.isActive}
			/>

			<div class="modal-actions">
				<button type="button" class="button" on:click={()=>isModalOpen = false}>Annulla</button>
				<button type="submit" class="button primary">Salva</button>
			</div>
		</form>
	</svelte:fragment>
</Modal>

