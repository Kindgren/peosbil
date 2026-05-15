<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'dark' | 'outline' | 'success'
}>(), {
  variant: 'primary'
})
</script>

<template>
  <span :class="['base-badge', `variant-${variant}`]">
    <slot></slot>
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.variant-primary {
  background-color: var(--color-primary);
  color: var(--color-background-white);
}

.variant-dark {
  background-color: var(--color-accent);
  color: var(--color-background-white);
}

.variant-outline {
  background-color: transparent;
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
}

.variant-success {
  background-color: var(--color-success);
  color: var(--color-background-white);
}
</style>