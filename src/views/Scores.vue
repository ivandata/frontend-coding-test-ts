<template>
  <section class="w-full max-w-sm h-full">
    <header class="my-5">
      <h1 class="font-bold text-3xl">Scores</h1>
    </header>
    <div class="tabs w-full flex gap-3 mb-10">
      <button
        v-for="level in gameLevels"
        v-bind:key="level"
        v-bind:class="[
          'text-2xl py-1 border-b-2 border-solid border-transparent px-2 hover:text-blue-900 rounded-lg',
          {
            'text-white bg-blue-500 hover:text-white':
              state.currentTab === level,
            'active-level': settingsStore.gameLevel === level,
          },
        ]"
        v-on:click="onTabClick(level)"
      >
        {{ capitalizeFirstLetter(level) }}
      </button>
    </div>

    <div class="tab-content">
      <table v-if="currentScores.length" class="table-auto w-full">
        <thead>
          <tr>
            <th class="text-left"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(score, index) in currentScores"
            v-bind:key="index"
            v-bind:class="{ 'bg-gray-100': index % 2 === 0 }"
          >
            <td class="text-left py-2 px-1">
              <p class="text-3xl uppercase">{{ score.initials }}</p>
            </td>
            <td class="text-right py-2 px-1">
              <p class="text-3xl">{{ score.scores }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <section
        v-else
        class="flex flex-col text-center bg-white rounded-lg border-gray-100 border-solid border-2 p-12"
      >
        <header class="text-3xl mb-5">
          <h1>No scores available</h1>
        </header>
        <div class="text-1xl">
          <router-link
            to="/pexeso"
            class="font-medium font-bold inline-block text-blue-900"
          >
            Play a game
          </router-link>
          &nbsp;to add first scores.
        </div>
      </section>
    </div>
  </section>
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

const state = reactive<{
  currentTab: GameLevel
}>({
  currentTab: settingsStore.gameLevel,
})

const gameLevels = Object.values(GameLevel)

const currentScores = computed(() =>
  getScores.value(state.currentTab).sort((a, b) => b.scores - a.scores),
)

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const onTabClick = (gameLevel: GameLevel) => {
  state.currentTab = gameLevel
}
</script>

<style lang="postcss" scoped></style>
