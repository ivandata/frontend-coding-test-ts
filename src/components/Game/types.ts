import { GameLevel } from '@types/game'

export interface CardProps {
  name: string
  image: string
}

export type GameDifficultyType = {
  [key in GameLevel]: {
    cards: number
  }
}
