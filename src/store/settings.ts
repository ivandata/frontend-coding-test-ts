import { defineStore } from 'pinia'
import { GameLevel, SettingsStore } from './types'

const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({ initials: null, gameLevel: GameLevel.EASY }),
  actions: {
    setInititals(newInitials: string) {
      this.initials = newInitials
    },
    setGameLevel(newLevel: GameLevel) {
      this.gameLevel = newLevel
    },
  },
})

export default useSettingsStore
