import { GameLevel } from '@types/game'
import { GameDifficultyType } from './types'

export const GameDifficulty: GameDifficultyType = {
  [GameLevel.EASY]: {
    cards: 12,
  },
  [GameLevel.MEDIUM]: {
    cards: 16,
  },
  [GameLevel.HARD]: {
    cards: 32,
  },
}
