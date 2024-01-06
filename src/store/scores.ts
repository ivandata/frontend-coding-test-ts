import { defineStore } from 'pinia'
import { ScoresStore, Score, GameLevel } from './types'

const useScoresStore = defineStore('scores', {
  state: (): ScoresStore => ({ easy: [], medium: [], hard: [] }),
  getters: {
    getScores: (state) => {
      return (gameLevel: GameLevel) => {
        return state[gameLevel]
      }
    },
    getAllScores: (state) => {
      return state
    },
  },
  actions: {
    addResults(gameLevel: GameLevel, results: Score) {
      this[gameLevel].push(results)
    },
  },
})

export default useScoresStore
