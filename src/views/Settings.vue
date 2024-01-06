<template>
  <div class="settings">
    <div>
      <label for="initials">Your Initials:</label>
      <input
        id="initials"
        v-model="state.initials"
        type="text"
        maxlength="3"
        v-on:input="validateInitials"
      />
    </div>

    <div>
      <label for="game-level">Select Game Level:</label>
      <select id="game-level" v-model="state.gameLevel">
        <option
          v-for="(level, key) in Object.values(GameLevel)"
          v-bind:key="key"
          v-bind:value="level"
        >
          {{ level }}
        </option>
      </select>
    </div>

    <button v-on:click="saveSettings">Save Settings</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useSettingsStore from '@store/settings'
import { GameLevel, SettingsStore } from '@store/types'

const settingsStore = useSettingsStore()

const initialState: SettingsStore = {
  initials: settingsStore.initials,
  gameLevel: settingsStore.gameLevel,
}

const state = reactive<SettingsStore>({ ...initialState })

const validateInitials = () => {
  state.initials = state.initials
    ? state.initials.toUpperCase().replace(/[^A-Z0-9]/gi, '')
    : null
}

const saveSettings = () => {
  settingsStore.setInitials(state.initials ?? '') // Set to empty string if null
  settingsStore.setGameLevel(state.gameLevel)
  console.log(
    'Settings saved:',
    settingsStore.initials,
    settingsStore.gameLevel,
  )
}
</script>

<style scoped>
/* Add your CSS styles here */
.settings div {
  margin-bottom: 15px;
}
</style>
