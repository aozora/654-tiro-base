<script lang='ts'>
  // import { type DataHandler, type Row } from '@vincjo/datatables';
  import Search from './Search.svelte';
  import RowsPerPage from './RowsPerPage.svelte';
  import RowCount from './RowCount.svelte';
  import Pagination from './Pagination.svelte';

  // type T = $$Generic<Row>

  // export let handler: DataHandler<T>;
  export let search = true;
  export let itemsPerPage = true;
  export let itemsPerPageLabel: string = undefined
  export let rowCount = true;
  export let pagination = true;

  let element: HTMLElement;
  let clientWidth = 1000;

  const height = (search || itemsPerPage ? 48 : 8) + (rowCount || pagination ? 48 : 8);

  // handler.on('change', () => {
  //   if (element) element.scrollTop = 0;
  // });

</script>

<section bind:clientWidth class={`cb-datatable ${$$props.class ?? ''}`}>
  <slot name='datatable-header' />

  <div role='toolbar' class:container={search || itemsPerPage}>
    <!--{#if search}-->
    <!--  <Search {handler} />-->
    <!--{/if}-->
    <slot name='toolbar-button' />
  </div>

  <div class='table-container' bind:this={element} style='height:calc(100% - {height}px)'>
    <slot />
  </div>

  <footer class:container={rowCount || pagination}>
    {#if itemsPerPage}
      <RowsPerPage {handler} small={clientWidth < 600} itemsPerPageLabel={itemsPerPageLabel} />
    {/if}
    {#if rowCount}
      <RowCount {handler} small={clientWidth < 600} />
    {/if}
    {#if pagination}
      <Pagination {handler} small={clientWidth < 600} />
    {/if}
  </footer>
</section>

<style lang='scss'>
  .cb-datatable {
    width: 100%;
    height: 100%;
    margin-bottom: 2rem;
    background-color: var(--token-layer01);
  }

  .cb-datatable :global(table) {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }

  .cb-datatable :global(thead) {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    background-color: var(--token-layer02);
  }

  [role='toolbar'] {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 48px;
    padding: 0;
  }


  footer.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0;
    border-top: 1px solid var(--token-layer02);
  }

  .table-container {
    position: relative;
    /* height:calc(100% - 96px); */
    overflow: auto;
    //scrollbar-width: thin;
  }
</style>
