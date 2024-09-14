<script lang='ts'>
  // import ErrorFilled from 'carbon-icons-svelte/lib/ErrorFilled.svelte';
  // import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';
  // import InformationFilled from 'carbon-icons-svelte/lib/InformationFilled.svelte';
  // import CheckmarkFilled from 'carbon-icons-svelte/lib/CheckmarkFilled.svelte';

  import { Bug, CheckCircle, Info, Warning } from 'phosphor-svelte';

  export let kind: 'error' | 'info' | 'success' | 'warning' = 'info';
  export let title: string;
  export let subtitle: string;
  export let showTimestamp: boolean = true;
  // export let hideCloseButton: boolean = false;

  const timestamp = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'long'
  }).format(new Date());
</script>

<div class='cb-notification-toast-item'
     class:cb-notification-toast-success={kind === 'success'}
     class:cb-notification-toast-error={kind === 'error'}
     class:cb-notification-toast-info={kind === 'info'}
     class:cb-notification-toast-warning={kind === 'warning'}
>
  {#if kind === 'success'}
    <CheckCircle size={18} class='cb-notification-toast-icon' />
  {/if}
  {#if kind === 'error'}
    <Bug size={18} class='cb-notification-toast-icon' />
  {/if}
  {#if kind === 'info'}
    <Info size={18} class='cb-notification-toast-icon' />
  {/if}
  {#if kind === 'warning'}
    <Warning size={18} class='cb-notification-toast-icon' />
  {/if}

  <div class='cb-notification-toast-details'>
    <div class='cb-notification-toast-title'>{title}</div>
    <div class='cb-notification-toast-subtitle'>{subtitle}</div>
    {#if showTimestamp}
      <div class='cb-notification-toast-timestamp'>{timestamp}</div>
    {/if}
  </div>
</div>

<style lang='scss'>
  .cb-notification-toast-item {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    padding: 1rem 0;

    &.cb-notification-toast-success {
      --color: var(--token-support-success-inverse);
    }

    &.cb-notification-toast-info {
      --color: var(--token-support-error-inverse);
    }

    &.cb-notification-toast-error {
      --color: var(--token-support-error-inverse);
    }

    &.cb-notification-toast-warning {
      --color: var(--token-support-warning-inverse);
    }

    border-left: 3px solid var(--color);
  }

  :global(.cb-notification-toast-icon) {
    flex: 0 0 3rem;
    width: 3rem;
    color: var(--color);
  }

  .cb-notification-toast-details {
    flex: 1 1 auto;
  }

  .cb-notification-toast-title,
  .cb-notification-toast-subtitle,
  .cb-notification-toast-timestamp {
    margin: 0;
    text-align: left;
    color: var(--token-color-gray100);
  }

  .cb-notification-toast-title {
    font-size: var(--token-heading-compact-01-font-size);
    font-weight: var(--token-heading-compact-01-font-weight);
    line-height: var(--token-heading-compact-01-line-height);
    letter-spacing: var(--token-heading-compact-01-letter-spacing);
  }

  .cb-notification-toast-subtitle,
  .cb-notification-toast-timestamp {
    font-size: var(--token-body-compact-01-font-size);
    font-weight: var(--token-body-compact-01-font-weight);
    line-height: var(--token-body-compact-01-line-height);
    letter-spacing: var(--token-body-compact-01-letter-spacing);
  }

  .cb-notification-toast-subtitle {
    margin-bottom: 1.5rem;
  }
</style>
