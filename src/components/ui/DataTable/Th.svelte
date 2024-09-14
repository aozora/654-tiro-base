<script lang='ts'>
  import type { DataHandler, Field, Row } from '@vincjo/datatables';
  import ArrowUp from 'carbon-icons-svelte/lib/ArrowUp.svelte';
  import ArrowDown from 'carbon-icons-svelte/lib/ArrowDown.svelte';
  import ArrowsVertical from 'carbon-icons-svelte/lib/ArrowsVertical.svelte';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;
  export let orderBy: Field<T>;
  // export let align: 'left' | 'right' | 'center' = 'left';

  const identifier = orderBy?.toString();
  const sort = handler.getSort();
</script>

<th
  on:click={() => handler.sort(orderBy)}
  class:sortable={orderBy}
  class:active={$sort.identifier === identifier}
  class={$$props.class ?? ''}
>
  <div class='flex'>
    <strong>
      <slot />
    </strong>

    {#if $sort.identifier !== identifier}
      <ArrowsVertical size={20} class='not-sorted' />
    {/if}
    {#if $sort.identifier === identifier && $sort.direction === 'asc'}
      <ArrowUp size={20} />
    {/if}
    {#if $sort.identifier === identifier && $sort.direction === 'desc'}
      <ArrowDown size={20} />
    {/if}
    <!--    <span class:asc={$sort.direction === 'asc'} class:desc={$sort.direction === 'desc'} />-->
  </div>
</th>

<style lang='scss'>
  th {
    border: 0;
    padding: 1rem;
    font-family: 'IBM Plex Sans', Helvetica Neue, Arial, sans-serif;
    font-size: .875rem;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: 0;
    background: inherit;
    white-space: nowrap;
    user-select: none;

    &:hover {
      background-color: var(--token-color-gray70-hover);
    }

    &.sortable {
      cursor: pointer;
    }

    .flex {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;

      strong {
        font-weight: 600
      }
    }
  }

  th.sortable {
    :global(.not-sorted) {
      visibility: hidden;
    }

    &:hover,
    &:focus,
    &:focus-visible {
      :global(.not-sorted) {
        visibility: visible;
      }
    }
  }
</style>
