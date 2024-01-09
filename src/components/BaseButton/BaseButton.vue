<template>
  <button
    v-bind:class="[defaultClasses, sizeClasses]"
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
  size?: number | string
  class?: string
}>()

const emits = defineEmits(['click'])
const sizeClasses = computed(() => `w-${props.size} h-${props.size} block`)
const defaultClasses = computed(() => `button ${props.class}`)

const onClick = () => {
  emits('click')
}
</script>

<style lang="postcss" scoped>
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
</style>
