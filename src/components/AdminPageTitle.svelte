<script lang="ts">
	let { title } = $props();
</script>

<h1 class="page-title">{title}</h1>

<style lang="scss">
  .page-title {
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: var(--color-light-gray);
    font-family: var(--variable-font-family-brutal);
    font-size: var(--text-scale-20);
    line-height: 2;
    text-align: center;
  }
</style>
