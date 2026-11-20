<script lang="ts">
	import {
		createForm,
		Field,
		Form,
		reset,
		setErrors,
		type SubmitHandler,
	} from '@formisch/svelte';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
	} from '@internationalized/date';
	import { PackagePlus } from '@lucide/svelte';
	import { Calendar1 } from '@lucide/svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { toast } from 'svelte-sonner';
	import DataTable from '#components/DataTable.svelte';
	import DataTableButton from '#components/DataTableButton.svelte';
	import DataTableFormButton from '#components/DataTableFormButton.svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import { Button, buttonVariants } from '#lib/components/ui/button/index.ts';
	import { Calendar } from '#lib/components/ui/calendar/index.js';
	import { renderComponent } from '#lib/components/ui/data-table/index.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as Popover from '#lib/components/ui/popover/index.js';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';
	import type { Match } from '#lib/server/database/schema.ts';
	import { cn } from '#lib/utils.ts';
	import type { PageProps } from './$types';
	import { schema } from './schema';

	let { data }: PageProps = $props();
	const { tournament, matches } = $derived(data);

	const matchForm = createForm({
		schema,
		initialInput: {
			tournamentId: '',
			date: new Date().toISOString(),
		},
	});

	let isModalOpen = $state(false);
	let item: Match | undefined = $state(undefined);

	const columns: ColumnDef<Match>[] = [
		{
			accessorKey: 'date',
			header: 'Data partita',
			cell: ({ row }) => {
				const match = row.original;
				return new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(
					match.date,
				);
			},
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
					onclick: () => onEditMatch(match),
				});
			},
		},
		{
			id: 'editMatchAction',
			cell: ({ row }) => {
				const match = row.original;
				return renderComponent(DataTableButton, {
					label: 'Gestisci',
					type: 'button',
					variant: 'default',
					icon: 'Dices',
					class: 'cursor-pointer',
					href: `/admin/tournaments/${tournament.id}/${match.id}`,
				});
			},
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const match = row.original;

				return renderComponent(DataTableFormButton, {
					ids: [{ name: 'id', value: match.id }],
					action: '?/delete',
					label: 'Elimina',
					type: 'submit',
					variant: 'destructive',
					icon: 'Trash2',
					class: 'cursor-pointer',
					confirm: {
						title: `Eliminare la partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}?`,
						description: 'Verranno eliminati anche i punteggi della partita.',
					},
				});
			},
		},
	];

	const df = new DateFormatter('it-IT', {
		dateStyle: 'long',
	});

	function toIsoDate(date: Date) {
		return date.toISOString();
	}

	function calendarDate(value: string | undefined) {
		if (!value) return undefined;
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return undefined;
		return new CalendarDate(
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
		);
	}

	const createMatch = () => {
		item = undefined;
		reset(matchForm, {
			initialInput: {
				tournamentId: tournament.id,
				date: toIsoDate(new Date()),
			},
		});
		isModalOpen = true;
	};

	const onEditMatch = (row: Match) => {
		item = row;
		reset(matchForm, {
			initialInput: {
				matchId: row.id,
				tournamentId: row.tournamentId,
				date: toIsoDate(row.date),
			},
		});
		isModalOpen = true;
	};

	const handleSubmit: SubmitHandler<typeof schema> = async (output) => {
		try {
			const result = await postAction('?/update', output);
			if (result.type === 'success') {
				item = undefined;
				isModalOpen = false;
				toast.success('Triplooo! Dati salvati!');
				return;
			}
			if (result.type === 'failure' || result.type === 'error') {
				setErrors(matchForm, {
					errors: [failureMessage(result, 'Qualcosa è andato storto')],
				});
				toast.error("Cita murta! c'è un errore....");
			}
		} catch (error) {
			console.error(error);
			toast.error("Cita murta! c'è un errore....");
		}
	};
</script>

<PageTitle
	title={`${tournament.title}`}
	subtitle="Gestione partite"
	showBackButton={true}
	variant="admin"
/>

<Main>
	<div class="mx-auto w-full max-w-3xl">
		<header class="mb-6 flex justify-end">
			<Button
				type="button"
				size="lg"
				class="h-11 w-full cursor-pointer sm:w-auto"
				onclick={() => createMatch()}
			>
				<span>Nuova partita</span>
				<PackagePlus size={24} />
			</Button>
		</header>

		{#if matches.length > 0}
			<DataTable data={matches} {columns} />
		{:else}
			<p class="panel px-6 py-12 text-center text-muted-foreground">
				Non c'è ancora nessuna partita qua...
			</p>
		{/if}
	</div>
</Main>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{item === undefined
					? 'Nuova partita'
					: 'Modifica partita'}</Dialog.Title
			>
		</Dialog.Header>

		<Form of={matchForm} onsubmit={handleSubmit} class="flex flex-col gap-4">
			<Field of={matchForm} path={['date']}>
				{#snippet children(field)}
					{@const selected = calendarDate(field.input)}
					{@const { oninput, onchange, ...fieldProps } = field.props}
					<Label id="match-date-label">Data partita</Label>
					<Popover.Root>
						<Popover.Trigger
							{...fieldProps}
							aria-labelledby="match-date-label"
							aria-invalid={!!field.errors}
							class={cn(
								buttonVariants({ variant: 'outline' }),
								'w-full justify-start pl-4 text-left font-normal',
								!selected && 'text-muted-foreground',
							)}
						>
							{selected
								? df.format(selected.toDate(getLocalTimeZone()))
								: 'Pick a date'}
							<Calendar1 class="ml-auto size-4 opacity-50" />
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0" side="top">
							<Calendar
								type="single"
								value={selected}
								minValue={new CalendarDate(1900, 1, 1)}
								calendarLabel="Data partita"
								onValueChange={(value) => {
									field.onInput(
										value ? value.toDate(getLocalTimeZone()).toISOString() : '',
									);
								}}
							/>
						</Popover.Content>
					</Popover.Root>
					{#if field.errors}
						<p class="text-sm text-destructive">{field.errors[0]}</p>
					{/if}
				{/snippet}
			</Field>

			<Button type="submit" disabled={matchForm.isSubmitting} class="w-full">
				{matchForm.isSubmitting ? 'Salvataggio...' : 'Conferma'}
			</Button>

			{#if matchForm.errors}
				<div class="mt-3 rounded-md text-red-700">{matchForm.errors[0]}</div>
			{/if}
		</Form>
	</Dialog.Content>
</Dialog.Root>
