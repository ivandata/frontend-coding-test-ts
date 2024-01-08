<template>
  <section>
    <header><h2 class="text-gray-500 text-xl">Game Difficulty</h2></header>
    <div class="w-full flex justify-between items-center py-3">
      <button
        class="button"
        aria-label="Decrease game level"
        v-bind:disabled="isFirstLevel"
        v-on:click="changeLevel(-1)"
      >
        <span class="w-10 h-10 block">
          <svg class="w-full h-full">
            <use xlink:href="#chevron-back-outline">
              <symbol id="chevron-back-outline" viewBox="0 0 512 512">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  fill="none"
                  stroke="currentColor"
                  d="M328 112L184 256l144 144"
                ></path>
              </symbol>
            </use>
          </svg>
        </span>
      </button>
      <span class="text-4xl font-bold uppercase">{{ currentLevel }}</span>
      <button
        class="button"
        aria-label="Increase game level"
        v-bind:disabled="isLastLevel"
        v-on:click="changeLevel(1)"
      >
        <span class="w-10 h-10 block">
          <svg class="w-full h-full">
            <use xlink:href="#chevron-forward-outline">
              <symbol id="chevron-forward-outline" viewBox="0 0 512 512">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  fill="none"
                  stroke="currentColor"
                  d="M184 112l144 144-144 144"
                ></path>
              </symbol>
            </use>
          </svg>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import useSettingsStore from '@store/settings'
import { GameLevel } from '@store/types'

const settingsStore = useSettingsStore()

const gameLevels: GameLevel[] = Object.values(GameLevel)
const currentLevelIndex: Ref<number> = computed(() =>
  gameLevels.indexOf(settingsStore.gameLevel),
)

const currentLevel: Ref<string> = computed(
  () => gameLevels[currentLevelIndex.value],
)

const isFirstLevel: Ref<boolean> = computed(() => currentLevelIndex.value === 0)
const isLastLevel: Ref<boolean> = computed(
  () => currentLevelIndex.value === gameLevels.length - 1,
)

const changeLevel = (direction: number) => {
  const newIndex = currentLevelIndex.value + direction
  if (newIndex >= 0 && newIndex < gameLevels.length) {
    settingsStore.setGameLevel(gameLevels[newIndex] as GameLevel)
  }
}
</script>

<style lang="postcss" scoped>
.button {
  @apply px-2 py-2 border-2 rounded-full  bg-white h-16 w-16 text-gray-800 flex justify-center items-center;

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
