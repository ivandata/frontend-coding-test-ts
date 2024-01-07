import { GameLevel } from '@store/types'

export const GameDifficulty = {
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
