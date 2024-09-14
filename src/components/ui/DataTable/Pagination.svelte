<script lang='ts'>
  import type { DataHandler, Row } from '@vincjo/datatables';
  import CaretLeft from 'carbon-icons-svelte/lib/CaretLeft.svelte';
  import CaretRight from 'carbon-icons-svelte/lib/CaretRight.svelte';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;

  const pageNumber = handler.getPageNumber();
  const pageCount = handler.getPageCount();
  const pages = handler.getPages({ ellipsis: true });
</script>

<section class={$$props.class ?? ''}>
  <button
    type='button'
    class:disabled={$pageNumber === 1}
    on:click={() => handler.setPage('previous')}
  >
    <CaretLeft size={16} />
  </button>
  {#each $pages as page}
    <button
      type='button'
      class:active={$pageNumber === page}
      class:ellipse={page === null}
      on:click={() => handler.setPage(page)}
    >
      {page ?? '...'}
    </button>
  {/each}
  <button
    type='button'
    class:disabled={$pageNumber === $pageCount}
    on:click={() => handler.setPage('next')}
  >
    <CaretRight size={16} />
  </button>
</section>

<style lang='scss'>
  @import '../../../styles/tokens';
  @import '../../../styles/components/form-mixins';

  section {
    display: flex;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: var(--token-body-compact-01-font-size);
    line-height: var(--token-body-compact-01-line-height);
    font-weight: var(--token-body-compact-01-font-weight);
    letter-spacing: var(--token-body-compact-01-letter-spacing);
    color: var(--token-color-text-secondary);
    background: transparent;

    &:hover {
      background-color: var(--button-button-secondary-hover-background);
    }

    &:active {
      background-color: var(--button-button-secondary-active-background);
    }

    &:focus, &:focus-visible {
      border: var(--button-button-secondary-focus-outline-border);
      box-shadow: var(--button-button-secondary-focus-outline-inset);
    }

    &:disabled {
      background-color: var(--button-button-secondary-disabled-background);
      color: var(--button-button-secondary-disabled-color);
    }
  }

  //button:first-child {
  //  border-radius: 4px 0 0 4px;
  //}
  //
  //button:last-child {
  //  border-right: 1px solid #e0e0e0;
  //  border-radius: 0 4px 4px 0;
  //}
  //
  //button:first-child:not(.small),
  //button:last-child:not(.small) {
  //  min-width: 72px;
  //}
  //
  //button:not(.active):hover {
  //  background: #eee;
  //}
  //
  //button.ellipse:hover {
  //  background: inherit;
  //  cursor: default;
  //}
  //
  //button.active {
  //  background: #eee;
  //  font-weight: bold;
  //  cursor: default;
  //}
  //
  //button.disabled:hover {
  //  background: inherit;
  //  cursor: default;
  //}
</style>
