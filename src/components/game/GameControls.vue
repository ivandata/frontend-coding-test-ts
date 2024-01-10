<template>
  <div class="flex flex-row gap-5 items-center">
    <BaseButton
      v-if="!isGameStarted"
      size="md"
      aria-label="Start Game"
      v-bind:is-disabled="isStartButtonDisabled"
      v-on:click="emitStart"
    >
      <SvgIcon size="sm" color="white">
        <Play />
      </SvgIcon>
    </BaseButton>

    <BaseButton
      v-else
      size="md"
      class="button"
      aria-label="Reset Game"
      v-bind:is-disabled="isResetButtonDisabled"
      v-on:click="emitReset"
    >
      <SvgIcon size="sm" color="white">
        <Repeat />
      </SvgIcon>
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseButton from '@components/BaseButton/BaseButton.vue'
import SvgIcon, { Play, Repeat } from '@components/SvgIcon'

const props = defineProps<{
  isLoading: boolean
  isGameStarted: boolean
  preparationTime: boolean
}>()

const emit = defineEmits(['reset', 'start'])

const isResetButtonDisabled = computed(
  () =>
    props.isLoading || !props.isGameStarted || Boolean(props.preparationTime),
)

const isStartButtonDisabled = computed(
  () => props.isLoading || props.isGameStarted,
)
const emitReset = () => emit('reset')
const emitStart = () => emit('start')
</script>

<style lang="postcss" scoped>
.button {
  @apply text-sm px-2 py-2 border-2 rounded-full border-blue-800 bg-blue-700;

  &:disabled {
    @apply pointer-events-none opacity-20 cursor-default;
    cursor: default;
    pointer-events: none;
  }
  &:hover {
    @apply bg-blue-800;
  }
}
</style>
