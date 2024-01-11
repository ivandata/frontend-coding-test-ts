export enum GameLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Score {
  initials: string | null
  scores: number
}
