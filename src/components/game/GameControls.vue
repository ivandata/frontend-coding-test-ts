<template>
  <div class="flex flex-row gap-5 items-center">
    <button
      v-if="!isGameStarted"
      class="button"
      type="button"
      aria-label="Start Game"
      v-bind:disabled="isStartButtonDisabled"
      v-on:click="emitStart"
    >
      <span class="w-6 h-6 block">
        <svg class="w-full h-full text-white">
          <use xlink:href="#play-outline">
            <symbol id="play-outline" viewBox="0 0 512 512">
              <path
                d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"
                stroke-miterlimit="10"
                stroke-width="32px"
                fill="none"
                stroke="currentColor"
              ></path>
            </symbol>
          </use>
        </svg>
      </span>
    </button>

    <button
      v-else
      class="button"
      type="button"
      aria-label="Reset Game"
      v-bind:disabled="isResetButtonDisabled"
      v-on:click="emitReset"
    >
      <span class="w-6 h-6 block">
        <svg class="w-full h-full text-white">
          <use xlink:href="#repeat-outline">
            <symbol id="repeat-outline" viewBox="0 0 512 512">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32px"
                d="M320 120l48 48-48 48"
                fill="none"
                stroke="currentColor"
              ></path>
              <path
                d="M352 168H144a80.24 80.24 0 00-80 80v16M192 392l-48-48 48-48"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32px"
                fill="none"
                stroke="currentColor"
              ></path>
              <path
                d="M160 344h208a80.24 80.24 0 0080-80v-16"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32px"
                fill="none"
                stroke="currentColor"
              ></path>
            </symbol>
          </use>
        </svg>
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

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
