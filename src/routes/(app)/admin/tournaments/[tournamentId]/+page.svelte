<script lang="ts">
	import Main from '$components/Main.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$lib/components/ui/data-table';
	import type { Match } from '$lib/server/database/schema';
	import DataTable from '$components/DataTable.svelte';
	import DataTableButton from '$components/DataTableButton.svelte';
	import { PackagePlus } from '@lucide/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';
	import DataTableFormButton from '$components/DataTableFormButton.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils';
	import { Calendar1 } from '@lucide/svelte';
	import {
		CalendarDate,
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';

	let { data }: PageProps = $props();
	const { tournament, players, matches } = data;

	let form = $derived(
		superForm(data.form, {
			validators: valibotClient(schema),
			dataType: 'json',
			onUpdated: ({ form }) => {
				console.log(`🍉   form updated: ${form.valid} ${form.message} ${form.errors?._errors} ${page.status}`);

				// When the form is successfully submitted close the modal and reset the item variable
				if (form.valid && form.message && page.status < 400) {
					item = undefined;
					isModalOpen = false;

					// show a toast
					toast.success('Triplooo! Dati salvati!');
				} else {
					toast.error('Cita murta! c\'è un errore....');
				}
			}
		})
	);
	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);

	let isModalOpen = $state(false);
	let item: Match | undefined = $state(undefined);
	let value = $derived($formData.date ?? undefined);

	const columns: ColumnDef<Match>[] = [
		{
			accessorKey: 'date',
			header: 'Data partita',
			cell: ({ row }) => {
				const match = row.original;
				return new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date);
			}
		},
		{
			id: 'editAction',
			cell: ({ row }) => {
				const match = row.original;
				return renderComponent(DataTableButton, {
					label: 'Modifica',
					type: 'button',
					variant: 'outline',
					icon: 'PencilLine',
					class: 'cursor-pointer',
					onclick: () => onEditMatch(match)
				});
			}
		},
		{
			id: 'editMatchAction',
			cell: ({ row }) => {
				const match = row.original;
				return renderComponent(DataTableButton, {
					label: 'Gestisci',
					type: 'button',
					variant: 'outline',
					icon: 'Dices',
					class: 'cursor-pointer',
					href: `/admin/tournaments/${tournament.id}/${match.id}`
				});
			}
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const match = row.original;

				return renderComponent(DataTableFormButton, {
					ids: [{ name: 'id', value: match.id }],
					enhance: enhance,
					action: '?/delete',
					label: 'Elimina',
					type: 'submit',
					variant: 'destructive',
					icon: 'Trash2',
					class: 'cursor-pointer',
					onSubmit: (e) => {
						const okDelete = confirm(
							`Elimino la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)} ?`
						);

						if (!okDelete) {
							e.preventDefault();
							return;
						}
					}
				});
			}
		}
	];

	const df = new DateFormatter('it-IT', {
		dateStyle: 'long'
	});

	const createMatch = () => {
		item = undefined;
		isModalOpen = true;
	};

	const onEditMatch = (row: Match) => {
		item = row;
		isModalOpen = true;
	};

	// Populate form data when item changes
	$effect(() => {
		if (item) {
			$formData.matchId = item.id;
			$formData.tournamentId = item.tournamentId;
			$formData.date = item.date;
		} else {
			$formData.matchId = undefined;
			$formData.tournamentId = tournament.id;
			$formData.date = new Date();
		}
	});
</script>

<AdminPageTitle title={`${tournament.title}`} subtitle="Gestione partite" showBackButton={true} />

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-8">
			<Button type="button" class="button" onclick={() => createMatch()}>
				<span>Nuova partita</span>
				<PackagePlus size={24} />
			</Button>
		</header>

		{#if matches.length > 0}
			<DataTable data={matches} {columns} />
		{:else}
			<p class="empty-text">Non c'è ancora nessuna partita qua...</p>
		{/if}
	</div>
</Main>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{item === undefined ? 'Nuovo torneo' : 'Modifica torneo'}</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/update" use:enhance>
			<input type="hidden" name="matchId" bind:value={$formData.matchId} />
			<input type="hidden" name="tournamentId" bind:value={$formData.tournamentId} />

			<Form.Field {form} name="date">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Data partita</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
              buttonVariants({ variant: "outline" }),
              "w-[280px] justify-start pl-4 text-left font-normal",
              !value && "text-muted-foreground"
            )}
							>
								{value
									? df.format(value)
									: "Pick a date"}
								<Calendar1 class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									type="single"
									value={value as DateValue}
									minValue={new CalendarDate(1900, 1, 1)}
									maxValue={today(getLocalTimeZone())}
									calendarLabel="Date of birth"
									onValueChange={(v) => {
										if (v) {
											$formData.date = v.toDate(getLocalTimeZone());
										} else {
											$formData.date = "";
										}
									}}
								/>
							</Popover.Content>
						</Popover.Root>
						<Form.Description
						>Your date of birth is used to calculate your age
						</Form.Description
						>
						<Form.FieldErrors />
						<input hidden value={$formData.date} name={props.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mb-4 *:mb-2" />
			</Form.Field>

			<Form.Button disabled={$submitting} class="w-full">
				{$submitting ? 'Salvataggio...' : 'Conferma'}
			</Form.Button>

			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700">
					{$errors?._errors}
				</div>
			{/if}
		</form>

	</Dialog.Content>
</Dialog.Root>

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
