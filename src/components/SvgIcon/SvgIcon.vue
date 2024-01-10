<template>
  <span v-bind:class="[sizeClasses, colorClasses]">
    <svg v-bind:class="svgClasses"><slot /></svg>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ size: number | string; color?: string }>()

const sizeClasses = computed(() =>
  props.size ? `w-${props.size} h-${props.size} block` : 'block',
)
const colorClasses = computed(() => `text-${props.color}`)
const svgClasses = computed(() => 'w-full h-full')
</script>
