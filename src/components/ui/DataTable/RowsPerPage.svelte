<script lang='ts'>
  import type { DataHandler, Row } from '@vincjo/datatables';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;
  export let small = false;
  export let itemsPerPageLabel: string = 'Items per page: ';

  const rowsPerPage = handler.getRowsPerPage();

  const options = [5, 10, 20, 50, 100];
</script>

<aside class={$$props.class ?? ''}>
  <label for='items-per-page'>{itemsPerPageLabel}</label>
  <select id='items-per-page' bind:value={$rowsPerPage} on:change={() => handler.setPage(1)}>
    {#each options as option}
      <option value={option}>
        {option}
      </option>
    {/each}
  </select>
</aside>

<style lang='scss'>
  @import '../../../styles/shared';
  @import '../../../styles/components/form-mixins';

  aside {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
  }

  label,
  select {
    font-size: var(--token-body-compact-01-font-size);
    line-height: var(--token-body-compact-01-line-height);
    font-weight: var(--token-body-compact-01-font-weight);
    letter-spacing: var(--token-body-compact-01-letter-spacing);
  }

  label {
    color: var(--token-color-text-secondary);
  }

  select {
    width: auto;
    min-width: auto;
    height: 100%;
    margin: 0 4px;
    padding: 0 2rem 0 1rem;
    border: 0;
    color: var(--token-color-text-primary);
    background-color: transparent;

    &:hover {
      background-color: var(--token-layer-hover-01);
    }

    &:focus, &:focus-visible {
      @include input-focus;
    }

  }
</style>
