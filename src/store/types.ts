import { GameLevel, Score } from '@types/game'

interface ScoresStore {
  [GameLevel.EASY]: Score[]
  [GameLevel.MEDIUM]: Score[]
  [GameLevel.HARD]: Score[]
}

interface SettingsStore {
  initials: string | null
  gameLevel: GameLevel
}

export { SettingsStore, ScoresStore }
