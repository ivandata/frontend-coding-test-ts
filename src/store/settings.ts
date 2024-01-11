import { defineStore } from 'pinia'
import { GameLevel } from '@types/game'
import { SettingsStore } from './types'

const useSettingsStore = defineStore('settings', {
  persist: true,
  state: (): SettingsStore => ({ initials: null, gameLevel: GameLevel.EASY }),
  actions: {
    setInitials(newInitials: string) {
      this.initials = newInitials
    },
    setGameLevel(newLevel: GameLevel) {
      this.gameLevel = newLevel
    },
  },
})

export default useSettingsStore
