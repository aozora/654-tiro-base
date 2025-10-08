<script lang="ts">
	import Main from '$components/Main.svelte';
	import type { Match, Player, Tournament } from '$lib/server/db';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import Loader from '$components/Loader.svelte';
	import Modal from '$components/ui/Modal/Modal.svelte';
	import DateInput from '$components/ui/Form/DateInput.svelte';
	import { Icons } from '$types';
	import Icon from '$components/Icon/Icon.svelte';
	import Select from '$components/ui/Form/Select.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';

	let { data }: PageProps = $props();
	const { tournament, players, matches } = data;

	const { errors, enhance, delayed, message, constraints } = superForm(data.form, {
		invalidateAll: 'force',
		onUpdated: ({ form }) => {
			// When the form is successfully submitted close the modal and reset the item variable
			if (form.valid && message && page.status < 400) {
				item = undefined;
				isModalOpen = false;

				// show a toast
				toast.success({
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

	const createMatch = () => {
		item = undefined;
		isModalOpen = true;
	};

	const onEditMatch = (row: Player) => {
		item = row;
		isModalOpen = true;
	};

	const onDeleteMatch = (e, row) => {
		const okDelete = confirm(
			`Elimino la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(row.date)} ?`
		);

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
<!--			<Datatable table={tableHanlder}>-->
<!--			</Datatable>-->
		{:else}
			<p class="empty-text">Non c'è ancora nessuna partita qua...</p>
		{/if}
	</div>

	{#if $delayed}
		<Loader />
	{/if}

<!--	<Modal-->
<!--		title={item === undefined ? 'Nuova partita' : 'Modifica partita'}-->
<!--		bind:isOpen={isModalOpen}-->
<!--	>-->
<!--		<svelte:fragment slot="modal-content">-->
<!--			<form id="form-player" action="?/update" method="POST">-->
<!--				<input type="hidden" name="matchId" value={item?.id} />-->
<!--				<input type="hidden" name="tournamentId" value={tournament.id} />-->
<!--				<DateInput-->
<!--					label="Data partita"-->
<!--					name="date"-->
<!--					errors={$errors.date}-->
<!--					constraints={$constraints.date}-->
<!--					value={item?.date}-->
<!--				/>-->

<!--				<div class="modal-actions">-->
<!--					<button type="button" class="button" on:click={() => (isModalOpen = false)}-->
<!--					>Annulla-->
<!--					</button-->
<!--					>-->
<!--					<button type="submit" class="button primary">Salva</button>-->
<!--				</div>-->
<!--			</form>-->
<!--		</svelte:fragment>-->
<!--	</Modal>-->
</Main>
