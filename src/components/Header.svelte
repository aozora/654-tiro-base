<script lang="ts">

import { DiceSix } from 'phosphor-svelte';
</script>

<header class="header">
  <a href="/" class="logo">
    <span>654 tiro base</span>
  </a>

  <button type="button" class="toggle-menu">
    <DiceSix size="36"/>
  </button>
  <nav class="menu">
    <!--    <ul></ul>-->
  </nav>

</header>

<style lang="scss">
  .header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 1rem;
    background: var(--color-dark) url(/img/frame-mini1.webp) no-repeat center center;
    background-size: 100%;
    z-index: 10;
  }

  .logo{
    font-family: var(--variable-font-family-brutal);
    font-size: var(--text-scale-18);
    text-decoration: none;
    color: var(--color-black);
  }

  .toggle-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 0;
    background-color: var(--color-brand);
  }

  .menu {
    display: none;
  }
</style>
