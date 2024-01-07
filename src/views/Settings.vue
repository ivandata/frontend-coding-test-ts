<template>
  <section class="w-full max-w-sm h-full">
    <header class="my-5">
      <h1 class="font-bold text-3xl">Settings</h1>
    </header>
    <InitialInput class="mb-16" />
    <LevelSwitcher />
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useSettingsStore from '@store/settings'
import { SettingsStore } from '@store/types'
import { useToast } from 'vue-toastification'
import LevelSwitcher from '@components/LevelSwitcher/LevelSwitcher.vue'
import InitialInput from '@components/InitialInput/InitialInput.vue'

const toast = useToast()

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
  toast.success('Settings saved', {
    timeout: 2000,
  })
}
</script>

<style scoped></style>
