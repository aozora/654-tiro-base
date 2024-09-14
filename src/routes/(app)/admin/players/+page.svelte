<script lang="ts">
import Main from '$components/Main.svelte';
import { TableHandler, Datatable, Th } from '@vincjo/datatables'
import type { Player } from '@prisma/client';
import type { PageData } from './$types';
import type { DatatableColumn } from '$types';

type PageProps = {
	players: Array<Player>
}

export let data: PageData;

const { players }: PageProps = data;
const columns: Array<DatatableColumn> = [
	{
		key: 'name',
		label: 'Nome'
		// width: "20%",
		// minWidth: "200px"
	},
	{
		key: 'picture',
		label: 'Foto'
	},
	{
		key: 'isActive',
		label: 'Attivo'
	}
];

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
				<Th {table} field="name">Nome</Th>
				<Th {table} field="picture">Foto</Th>
				<Th {table} field="isActive">Attivo</Th>
				<th></th>
			</tr>
<!--			<tr>-->
<!--				<ThFilter {table} field="first_name"/>-->
<!--				<ThFilter {table} field="last_name" />-->
<!--				<ThFilter {table} field="email"/>-->
<!--			</tr>-->
			</thead>
			<tbody>
			{#each table.rows as row}
				<tr>
					<td>{row.name}</td>
					<td>{row.picture}</td>
					<td>{row.isActive}</td>
					<td>
						<button class="button">Modifica</button>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</Datatable>
</Main>
