<template>
  <section>
    <header><h2 class="text-gray-500 text-xl">Game Difficulty</h2></header>
    <div class="w-full flex justify-between items-center py-3">
      <BaseButton
        size="md"
        aria-label="Decrease game level"
        v-bind:is-disabled="isFirstLevel"
        v-on:click="changeLevel(-1)"
      >
        <SvgIcon size="md"><ChevronBack /></SvgIcon>
      </BaseButton>
      <span class="text-4xl font-bold uppercase">{{ currentLevel }}</span>
      <BaseButton
        size="md"
        aria-label="Increase game level"
        v-bind:is-disabled="isLastLevel"
        v-on:click="changeLevel(1)"
      >
        <SvgIcon size="md"><ChevronForward /></SvgIcon>
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import useSettingsStore from '@store/settings'
import { GameLevel } from '@store/types'
import SvgIcon, { ChevronForward, ChevronBack } from '@components/SvgIcon'
import BaseButton from '@components/BaseButton/BaseButton.vue'

const settingsStore = useSettingsStore()

const gameLevels = Object.values(GameLevel)

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
