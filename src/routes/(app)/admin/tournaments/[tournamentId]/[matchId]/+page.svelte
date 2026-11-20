<script lang="ts">
	import {
		createForm,
		Field,
		Form,
		reset,
		setErrors,
		type SubmitHandler,
	} from '@formisch/svelte';
	import { Dice6 } from '@lucide/svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { toast } from 'svelte-sonner';
	import DataTable from '#components/DataTable.svelte';
	import DataTableButton from '#components/DataTableButton.svelte';
	import DataTableFormButton from '#components/DataTableFormButton.svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { renderComponent } from '#lib/components/ui/data-table/index.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as Select from '#lib/components/ui/select/index.ts';
	import { failureMessage, postAction } from '#lib/forms/post-action.ts';
	import type { PlayerExtended } from '#lib/server/repository.ts';
	import type { PageProps } from './$types';
	import { schema } from './schema';

	let { data }: PageProps = $props();

	const { match, allPlayers, players } = $derived(data);

	const scoreForm = createForm({
		schema,
		initialInput: {
			matchId: '',
			playerId: '',
			points: 0,
			territoriesPoints: 0,
		},
	});

	let isModalOpen = $state(false);
	let item: PlayerExtended | undefined = $state(undefined);

	const columns: ColumnDef<PlayerExtended>[] = [
		{
			accessorKey: 'name',
			header: 'Giocatore',
		},
		{
			accessorKey: 'points',
			header: 'Punti',
		},
		{
			accessorKey: 'territoriesPoints',
			header: 'Punti territori',
		},
		{
			id: 'editAction',
			cell: ({ row }) => {
				return renderComponent(DataTableButton, {
					label: 'Modifica',
					type: 'button',
					variant: 'outline',
					icon: 'PencilLine',
					class: 'cursor-pointer',
					onclick: () => onEditPoints(row.original),
				});
			},
		},
		{
			id: 'deleteAction',
			cell: ({ row }) => {
				const player = row.original;

				return renderComponent(DataTableFormButton, {
					ids: [
						{ name: 'matchId', value: match.id },
						{ name: 'playerId', value: player.id },
					],
					action: '?/delete',
					label: 'Elimina',
					type: 'submit',
					variant: 'destructive',
					icon: 'Trash2',
					class: 'cursor-pointer',
					confirm: { title: `Eliminare il punteggio di ${player.name}?` },
				});
			},
		},
	];

	const onEditPoints = (row: PlayerExtended) => {
		item = row;
		reset(scoreForm, {
			initialInput: {
				matchId: match.id,
				playerId: row.id,
				points: row.points,
				territoriesPoints: row.territoriesPoints,
			},
		});
		isModalOpen = true;
	};

	const addPlayer = () => {
		item = undefined;
		reset(scoreForm, {
			initialInput: {
				matchId: match.id,
				playerId: '',
				points: 0,
				territoriesPoints: 0,
			},
		});
		isModalOpen = true;
	};

	function onNumberInput(
		event: Event,
		onInput: (value: number | undefined) => void,
	) {
		const input = event.currentTarget;
		if (!(input instanceof HTMLInputElement)) return;
		if (input.value === '') {
			onInput(undefined);
			return;
		}
		const value = input.valueAsNumber;
		if (Number.isNaN(value)) return;
		onInput(value);
	}

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
				setErrors(scoreForm, {
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
	title={`Partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
	subtitle="Gestione punteggi"
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
				onclick={() => addPlayer()}
			>
				<span>Aggiungi punteggio</span>
				<Dice6 size="24" />
			</Button>
		</header>

		{#if players.length > 0}
			<DataTable data={players} {columns} />
		{:else}
			<p class="panel px-6 py-12 text-center text-muted-foreground">
				Non ci sono ancora giocatori qua...
			</p>
		{/if}
	</div>
</Main>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{item === undefined
					? 'Nuovo giocatore'
					: 'Modifica giocatore'}</Dialog.Title
			>
		</Dialog.Header>

		<Form of={scoreForm} onsubmit={handleSubmit} class="flex flex-col gap-4">
			<Field of={scoreForm} path={['playerId']}>
				{#snippet children(field)}
					{@const { oninput, onchange, ...fieldProps } = field.props}
					<span id="score-player-label">Giocatore</span>
					<Select.Root
						type="single"
						value={field.input ?? ''}
						onValueChange={(value) => field.onInput(value)}
					>
						<Select.Trigger
							{...fieldProps}
							aria-labelledby="score-player-label"
							aria-invalid={!!field.errors}
						>
							{allPlayers.find((player) => player.id === field.input)?.name ??
								'Seleziona un giocatore...'}
						</Select.Trigger>
						<Select.Content>
							{#if item}
								{#each allPlayers as player (player.id)}
									<Select.Item value={player.id} label={player.name} />
								{/each}
							{:else}
								{#each allPlayers.filter((player) => players.find((existing) => existing.id === player.id) === undefined) as player (player.id)}
									<Select.Item value={player.id} label={player.name} />
								{/each}
							{/if}
						</Select.Content>
					</Select.Root>
					{#if field.errors}
						<p class="text-sm text-destructive">{field.errors[0]}</p>
					{/if}
				{/snippet}
			</Field>

			<Field of={scoreForm} path={['points']}>
				{#snippet children(field)}
					<Label for="score-points">Punti</Label>
					<Input
						{...field.props}
						id="score-points"
						type="number"
						placeholder="punti"
						value={field.input ?? ''}
						aria-invalid={!!field.errors}
						aria-errormessage="score-points-error"
						oninput={(event) => onNumberInput(event, field.onInput)}
					/>
					{#if field.errors}
						<p id="score-points-error" class="text-sm text-destructive">
							{field.errors[0]}
						</p>
					{/if}
				{/snippet}
			</Field>

			<Field of={scoreForm} path={['territoriesPoints']}>
				{#snippet children(field)}
					<Label for="score-territories">Punti territori</Label>
					<Input
						{...field.props}
						id="score-territories"
						type="number"
						placeholder="punti territori"
						value={field.input ?? ''}
						aria-invalid={!!field.errors}
						aria-errormessage="score-territories-error"
						oninput={(event) => onNumberInput(event, field.onInput)}
					/>
					{#if field.errors}
						<p id="score-territories-error" class="text-sm text-destructive">
							{field.errors[0]}
						</p>
					{/if}
				{/snippet}
			</Field>

			<Button type="submit" disabled={scoreForm.isSubmitting} class="w-full">
				{scoreForm.isSubmitting ? 'Salvataggio...' : 'Conferma'}
			</Button>

			{#if scoreForm.errors}
				<div class="mt-3 rounded-md text-red-700">{scoreForm.errors[0]}</div>
			{/if}
		</Form>
	</Dialog.Content>
</Dialog.Root>
