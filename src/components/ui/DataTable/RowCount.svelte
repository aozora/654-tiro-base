<script lang='ts'>
  import type { DataHandler, Row } from '@vincjo/datatables';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;
  export let small = false;
  const rowCount = handler.getRowCount();
</script>

<aside class={$$props.class ?? ''}>
  {#if small}
    {#if $rowCount.total > 0}
      {$rowCount.start}-
      {$rowCount.end}/
      {$rowCount.total}
    {:else}
      {handler.i18n.noRows}
    {/if}
  {:else if $rowCount.total > 0}
    {'{start}-{end} of {total} items'
      .replace('{start}', `${$rowCount.start}`)
      .replace('{end}', `${$rowCount.end}`)
      .replace('{total}', `${$rowCount.total}`)}
  {:else}
    {handler.i18n.noRows}
  {/if}
</aside>

<style lang='scss'>
  aside {
    font-size: var(--token-body-compact-01-font-size);
    line-height: var(--token-body-compact-01-line-height);
    font-weight: var(--token-body-compact-01-font-weight);
    letter-spacing: var(--token-body-compact-01-letter-spacing);
    color: var(--token-color-text-secondary);
  }
</style>
