<script lang="ts">
	let { title } = $props();
</script>

<h1 class="page-title full-bleed">{title}</h1>

<style lang="scss">
  .page-title {
		position: sticky;
		top: 48px;
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: var(--color-light-gray);
    font-family: var(--variable-font-family-brutal);
    font-size: var(--text-scale-20);
    line-height: 2;
    text-align: center;
		z-index: 10;
  }
</style>
