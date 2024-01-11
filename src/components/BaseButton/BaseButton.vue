<template>
  <button
    v-bind:class="['button block', sizeClasses]"
    type="button"
    v-bind:aria-label="ariaLabel"
    v-bind:disabled="isDisabled"
    v-on:click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  ariaLabel: string
  isDisabled?: boolean
  size?: 'sm' | 'md'
  class?: string
}>()

const emits = defineEmits(['buttonPress'])

const sizes = {
  sm: 'small',
  md: 'medium',
}

const sizeClasses = computed(() => (props.size ? sizes[props.size] : ''))

const onClick = () => {
  emits('buttonPress')
}
</script>

<style scoped>
.button {
  @apply px-2 py-2 border-2 rounded-full bg-white text-gray-800 flex justify-center items-center;

  &:disabled {
    @apply pointer-events-none opacity-20 cursor-default;
    cursor: default;
    pointer-events: none;
  }
  &:hover {
    @apply text-blue-800;
  }
}
.small {
  @apply w-6 h-6;
}
.medium {
  @apply w-10 h-10;
}
</style>
