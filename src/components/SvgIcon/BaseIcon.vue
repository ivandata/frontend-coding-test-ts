<template>
  <span v-bind:class="[sizeClasses, 'block', colorClasses]">
    <svg class="svg"><slot /></svg>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ size?: 'sm' | 'md'; color?: string }>()

const sizes = {
  sm: 'small',
  md: 'medium',
}

const sizeClasses = computed(() => (props.size ? sizes[props.size] : ''))

const colorClasses = computed(() => (props.color ? `text-${props.color}` : ''))
</script>

<style scoped>
.svg {
  @apply w-full h-full;
}
.small {
  @apply w-6 h-6;
}
.medium {
  @apply w-10 h-10;
}
</style>
