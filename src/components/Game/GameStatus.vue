<template>
  <div v-if="isGameStarted" class="text-xl centered-container">
    <div v-if="preparationTime">
      <span class="sr-only">Preparation Time: </span>
      Get Ready:
      {{ preparationTime }}
    </div>
    <div v-else-if="gameTime" aria-live="polite" class="centered-container">
      <span class="text-xs">Remaining time</span>
      <br />
      <span class="sr-only">Time left: </span>
      {{ formattedGameTime }}
    </div>
  </div>
  <div
    v-else-if="bestScores"
    class="text-xl centered-container"
    aria-live="polite"
  >
    <span class="text-xs">Your best results</span>
    <span class="sr-only">Best Scores: </span>
    <br />
    {{ bestScores.scores }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useScoresStore from '@store/scores'
import useSettingsStore from '@store/settings'

const scores = useScoresStore()
const settings = useSettingsStore()

const props = defineProps<{
  isGameStarted: boolean
  preparationTime: number
  gameTime: number
}>()

const bestScores = computed(() => {
  return scores.getBestScoresByInitials(settings.initials, settings.gameLevel)
})

const formattedGameTime = computed(() => {
  const minutes = Math.floor(props.gameTime / 60)
  const seconds = props.gameTime % 60

  // Format the minutes and seconds to always have two digits
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return props.gameTime >= 60
    ? `${formattedMinutes}:${formattedSeconds}`
    : `${formattedSeconds} sec`
})
</script>

<style scoped>
.centered-container {
  @apply flex flex-col justify-center;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
