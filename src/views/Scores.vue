<template>
  <div>
    <div class="tabs">
      <button
        v-for="level in gameLevels"
        v-bind:key="level"
        v-bind:class="{
          'active-tab': state.currentTab === level,
          'active-level': settingsStore.gameLevel === level,
        }"
        v-on:click="onTabClick(level)"
      >
        {{ capitalizeFirstLetter(level) }}
      </button>
    </div>

    <div class="tab-content">
      <ul v-if="currentScores.length">
        <li v-for="(score, index) in currentScores" v-bind:key="index">
          {{ score }}
        </li>
      </ul>
      <div v-else>No scores available.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useScoresStore from '@store/scores'
import useSettingsStore from '@store/settings'
import { GameLevel } from '@store/types'

const settingsStore = useSettingsStore()

const scoresStore = useScoresStore()
const { getScores } = storeToRefs(scoresStore)

interface State {
  currentTab: GameLevel
}

const initialState: State = {
  currentTab: settingsStore.gameLevel,
}

const state = reactive<State>({ ...initialState })

const gameLevels = Object.values(GameLevel)

const currentScores = computed(() => getScores.value(state.currentTab))

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const onTabClick = (gameLevel: GameLevel) => {
  state.currentTab = gameLevel
}
</script>

<style lang="postcss" scoped>
.active-tab {
  border-bottom: 2px solid blue;
}
.active-level {
  color: red;
}
</style>
