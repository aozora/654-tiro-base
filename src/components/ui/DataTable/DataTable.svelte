<script lang='ts'>
  // import type Row from '@vincjo/datatables';
  import type { DatatableColumn } from './types';
  import { TableHandler } from '@vincjo/datatables';
 import DatatableWrapper from './DatatableWrapper.svelte';
  import Th from './Th.svelte';
  import ThFilter from './ThFilter.svelte';

  // type T = $$Generic<Row>

  // export let heading: string = undefined;
  // export let description: string = undefined;
  export let search = true;
  export let itemsPerPage = true;
  // export let itemsPerPageLabel: string = undefined;
  export let rowCount = true;
  export let pagination = true;
  export let showSearch = true;
  export let showRowsPerPage = true;
  export let showRowCount = true;
  export let showPagination = true;
  export let isEditable = true;
  export let onEdit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let rows: Array<any> = [];
  export let columns: Array<DatatableColumn> = [];

  // const handler = new DataHandler(rows, { rowsPerPage: 30 });
  const handler = new TableHandler(rows, { rowsPerPage: 30 })
  const _rows = handler.rows;
  let element: HTMLElement;
  // let clientWidth = 1000;
  // const height = (search || itemsPerPage ? 48 : 8) + (rowCount || pagination ? 48 : 8);

  handler.on('change', () => {
    if (element) {
      element.scrollTop = 0;
    }
  });
</script>

<DatatableWrapper class='cb-datatable' {handler}
                  search={showSearch}
                  rowsPerPage={showRowsPerPage}
                  rowCount={showRowCount}
                  pagination={showPagination}>
  <slot slot='toolbar-button' name='toolbar-button' />
  <table>
    <thead>
    <tr>
      {#each columns as column}
        <Th {handler} class='cb-datatable-th' orderBy={column.key}>{column.label}</Th>
      {/each}
      {#if isEditable}
        <th />
      {/if}
    </tr>
    <tr>
      {#each columns as column}
        <ThFilter {handler} class='cb-datatable-th' filterBy={column.key} />
      {/each}
      {#if isEditable}
        <th />
      {/if}
    </tr>
    </thead>
    <tbody>
    {#each _rows as row}
      <tr>
        {#each columns as column}
          <td>
            {#if column.key.split('.').length > 1}
              {@const keys = column.key.split('.')}
              {row[keys[0]][keys[1]]}
              {:else}
              {row[column.key]}
            {/if}
          </td>
        {/each}
        {#if isEditable}
          <td>
            <button type='button' class='cb-datatable-button' on:click={()=>onEdit(row)}>
              <span class='visuallyhidden'>Edit</span>
<!--              <Edit size={16} />-->
            </button>
          </td>
        {/if}
      </tr>
    {/each}
    </tbody>
  </table>
</DatatableWrapper>


<style lang='scss'>
  tbody td {
    border-top: 1px solid var(--token-layer02);
    padding: 1rem;
    font-family: 'IBM Plex Sans', Helvetica Neue, Arial, sans-serif;
    font-size: var(--token-body-01-font-size);
    line-height: var(--token-body-01-line-height);
    font-weight: var(--token-body-01-font-weight);
    letter-spacing: var(--token-body-01-letter-spacing);
    color: var(--token-color-text-secondary);
  }

  tbody tr {
    transition: all, 0.2s;
  }

  tbody tr:hover {
    background-color: var(--token-layer-hover-01);
    box-shadow: 0 1px 0 0 var(--token-color-gray70) inset;
  }

  .cb-datatable-button {
    width: 2rem;
    height: 2rem;
    border: 0;
    background-color: transparent;
    color: var(--token-color-text-secondary);

    &:hover, &:active {
      background-color: var(--token-layer01);
    }
  }
</style>
