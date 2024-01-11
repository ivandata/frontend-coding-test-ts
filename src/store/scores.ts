import { defineStore } from 'pinia'
import { GameLevel, Score } from '@types/game'
import { ScoresStore } from './types'

const useScoresStore = defineStore('scores', {
  persist: true,
  state: (): ScoresStore => ({
    [GameLevel.EASY]: [],
    [GameLevel.MEDIUM]: [],
    [GameLevel.HARD]: [],
  }),
  getters: {
    getScores: (state) => {
      return (gameLevel: GameLevel) => {
        return state[gameLevel]
      }
    },
    getAllScores: (state) => {
      return state
    },
    getBestScoresByInitials: (state) => {
      return (initials: string | null, level: GameLevel) => {
        const scoresAtLevel = state[level].filter(
          (score) => score.initials === initials,
        )
        if (scoresAtLevel.length > 0) {
          return scoresAtLevel.reduce((max, score) =>
            score.scores > max.scores ? score : max,
          )
        }
        return null
      }
    },
  },
  actions: {
    addResults(gameLevel: GameLevel, results: Score) {
      this[gameLevel].push(results)
    },
  },
})

export default useScoresStore
