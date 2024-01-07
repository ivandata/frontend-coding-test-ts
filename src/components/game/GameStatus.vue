<template>
  <div v-if="isGameStarted" class="text-xl">
    <div v-if="preparationTime">Get Ready: {{ preparationTime }}</div>
    <div v-else-if="gameTime">
      <div class="text-xs">Remaining time</div>
      {{ formattedGameTime }}
    </div>
  </div>
  <div v-else-if="bestScores" class="text-xl">
    <div class="text-xs">Your best results</div>
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
