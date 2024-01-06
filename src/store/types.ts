enum GameLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

interface Score {
  initials: string | null
  scores: number
}

interface ScoresStore {
  [GameLevel.EASY]: Score[]
  [GameLevel.MEDIUM]: Score[]
  [GameLevel.HARD]: Score[]
}

interface SettingsStore {
  initials: string | null
  gameLevel: GameLevel
}

export { GameLevel, SettingsStore, ScoresStore, Score }
