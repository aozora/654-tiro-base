<script lang='ts'>
  import type { DataHandler, Row } from '$lib/local';
  import Search from 'carbon-icons-svelte/lib/Search.svelte';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;
  let value = '';

  handler.on('clearSearch', () => value = '');
</script>

<div class='cb-datatable-search'>
  <label for='filter-table'>
    <span class='visuallyhidden'>Filter table</span>
  </label>
  <div class='search-icon'>
    <Search size={16} />
  </div>
  <input
    id='filter'
    class={$$props.class ?? ''}
    bind:value
    placeholder={handler.i18n.search}
    spellcheck='false'
    on:input={() => handler.search(value)}
  />
</div>

<style lang='scss'>
  @import '../../../styles/shared';
  @import '../../../styles/components/form-mixins';

  .cb-datatable-search {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;

    //svg {
    //  flex: 0 0 48px;
    //}

    input {
      flex: 1 1 auto;
    }
  }

  input {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 48px;
    border: 0;
    background: transparent;
    color: var(--token-color-text-primary);

    &::placeholder {
      @include input-placeholder;
    }

    &:focus, &:focus-visible {
      @include input-focus;
    }
  }

  .search-icon {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
  }
</style>
