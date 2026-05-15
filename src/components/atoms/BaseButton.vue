<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline' | 'ghost' | 'dark'
  size?: 'small' | 'medium' | 'large'
  to?: string | Record<string, any> | null
  href?: string | null
}>(), {
  variant: 'primary',
  size: 'medium',
  to: null,
  href: null
})

defineEmits<{
  (e: 'click'): void
}>()

const componentType = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component 
    :is="componentType" 
    :to="to" 
    :href="href"
    :class="['base-button', `variant-${variant}`, `size-${size}`]"
    @click="$emit('click')"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
  font-family: inherit;
  white-space: nowrap;
}

/* --- Sizes --- */
.size-small {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.size-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.size-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
}

/* --- Variants --- */
.variant-primary {
  background-color: var(--color-primary);
  color: var(--color-background-white);
}

.variant-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.variant-outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.variant-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-background-white);
  transform: translateY(-2px);
}

.variant-ghost {
  background-color: transparent;
  color: var(--color-text-main);
}

.variant-ghost:hover {
  background-color: var(--color-background-light);
}

.variant-dark {
  background-color: var(--color-accent);
  color: var(--color-background-white);
}

.variant-dark:hover {
  background-color: #000;
}
</style>