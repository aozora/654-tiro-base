<script lang='ts'>
  import type { DataHandler, Field, Comparator, Row } from '@vincjo/datatables';

  type T = $$Generic<Row>

  export let handler: DataHandler<T>;
  export let filterBy: Field<T>;
  export let align: 'left' | 'right' | 'center' = 'left';
  export let comparator: Comparator<T> = null;

  let value: string = '';

  handler.on('clearFilters', () => value = '');
</script>

<th class={$$props.class ?? ''}>
  <div class='flex'>
  <input
    style:text-align={align}
    type='text'
    placeholder={handler.i18n.filter}
    spellcheck='false'
    bind:value
    on:input={() => handler.filter(value, filterBy, comparator)}
  />
  </div>
</th>

<style lang='scss'>
  @import '../../../styles/tokens';
  @import '../../../styles/components/form-mixins';

  .flex {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  input {
    width: 100%;
    height: 32px;
    margin: 0;
    padding: 0 1rem;
    border: 0;
    //border-bottom: 1px solid var(--token-color-gray50);
    color: var(--token-color-text-primary);
    background: var(--token-color-gray80);
    font-size: .875rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 0;
    text-align: left;

    &::placeholder {
      @include input-placeholder;
    }

    &:focus, &:focus-visible {
      outline: 2px solid var(--token-color-white);
      outline-offset: -2px;
    }
  }
</style>
