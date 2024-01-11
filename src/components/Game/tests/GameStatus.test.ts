// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import render from '@test/render'
import { GameLevel } from '@store/types'
import { faker } from '@faker-js/faker'
import GameStatus from '../GameStatus.vue'

describe('GameStatus', () => {
  it('displays preparation time when game is started but still in preparation', () => {
    const { getByText } = render(GameStatus, {
      props: {
        isGameStarted: true,
        preparationTime: 5,
        gameTime: 0,
      },
    })

    expect(getByText('Get Ready: 5')).toBeTruthy()
  })

  it('displays remaining time when game is started and preparation time is over', () => {
    const { getByText } = render(GameStatus, {
      props: {
        isGameStarted: true,
        preparationTime: 0,
        gameTime: 120, // 2 minutes
      },
    })

    expect(getByText('02:00')).toBeTruthy()
    expect(getByText('Remaining time')).toBeTruthy()
  })

  it('displays best scores when game is not started', async () => {
    const getRandomScores = () => ({
      min: {
        initials: 'ABS',
        scores: faker.number.int({ min: 0, max: 100 }),
      },
      max: {
        initials: 'ABS',
        scores: faker.number.int({ min: 101, max: 200 }),
      },
    })
    const expectedScores = getRandomScores()
    const { findByText } = render(GameStatus, {
      props: {
        isGameStarted: false,
        preparationTime: 0,
        gameTime: 0,
      },
      store: {
        scores: {
          [GameLevel.EASY]: [expectedScores],
          [GameLevel.MEDIUM]: [getRandomScores()],
          [GameLevel.HARD]: [getRandomScores()],
        },
        settings: { initials: 'ABC', gameLevel: GameLevel.EASY },
      },
    })

    expect(findByText('Your best results')).toBeTruthy()
    expect(findByText(expectedScores.max.scores)).toBeTruthy()
  })
})
