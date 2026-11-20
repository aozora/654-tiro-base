<script lang="ts" generics="TData, TValue">
	import { type ColumnDef, getCoreRowModel } from '@tanstack/table-core';
	import {
		createSvelteTable,
		FlexRender,
	} from '#lib/components/ui/data-table/index.js';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	/** Text headers double as the cell labels of the stacked (narrow) layout. */
	const labelOf = (header: unknown) =>
		typeof header === 'string' ? header : undefined;
</script>

<!--
	The table adapts to the width of its own container, not of the viewport:
	below 42rem every row becomes a card, so it never needs to scroll sideways.
-->
<div class="@container/table">
	<div class="data-table rounded-lg border bg-card/90 shadow-sm">
		<table class="w-full text-sm">
			<thead>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<tr class="border-b">
						{#each headerGroup.headers as header (header.id)}
							<th
								scope="col"
								colspan={header.colSpan}
								class="h-11 px-4 text-left align-middle text-xs font-medium tracking-wide whitespace-nowrap text-muted-foreground uppercase"
							>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each table.getRowModel().rows as row (row.id)}
					<tr
						class="border-b transition-colors last:border-0 hover:bg-accent/40"
					>
						{#each row.getVisibleCells() as cell, index (cell.id)}
							{@const label = labelOf(cell.column.columnDef.header)}
							{#if index === 0}
								<th
									scope="row"
									class="cell-title px-4 py-3 text-left align-middle font-medium"
								>
									<FlexRender
										content={cell.column.columnDef.cell}
										context={cell.getContext()}
									/>
								</th>
							{:else}
								<td
									data-label={label}
									class={[
										'px-4 py-3 align-middle whitespace-nowrap',
										label ? 'cell-data' : 'cell-action w-px pl-0',
									]}
								>
									<FlexRender
										content={cell.column.columnDef.cell}
										context={cell.getContext()}
									/>
								</td>
							{/if}
						{/each}
					</tr>
				{:else}
					<tr>
						<td
							colspan={columns.length}
							class="h-24 text-center text-muted-foreground"
						>
							Nessun risultato.
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.cell-title {
		overflow-wrap: anywhere;
	}

	@container table (width < 42rem) {
		table,
		tbody {
			display: block;
		}

		/* The column headers are repeated next to each value instead */
		thead {
			display: none;
		}

		tr {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.875rem 0.5rem;
			padding: 1rem;
		}

		th,
		td {
			display: block;
			padding: 0;
		}

		.cell-title {
			flex: 1 1 100%;
			font-size: 1rem;
			font-weight: 600;
		}

		.cell-data {
			display: flex;
			flex: 1 1 100%;
			justify-content: space-between;
			gap: 1rem;
			white-space: normal;
		}

		.cell-data::before {
			content: attr(data-label);
			color: var(--muted-foreground);
		}

		/* Actions share the last line of the card */
		.cell-action {
			flex: 1 1 0;
			width: auto;
		}

		.cell-action:empty {
			display: none;
		}
	}
</style>
