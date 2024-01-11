// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import render from '@test/render'
import { GameLevel } from '@store/types'
import { faker } from '@faker-js/faker'
import GameHeader from '../GameHeader.vue'

describe('GameHeader', () => {
  const initials = faker.lorem.word(5)
  const gameLevel = faker.helpers.arrayElement(Object.values(GameLevel))

  it('renders initials and game level correctly', async () => {
    const { getByText } = render(GameHeader, {
      store: {
        settings: { initials, gameLevel },
      },
    })

    expect(getByText('Initials')).toBeTruthy()
    expect(getByText(initials)).toBeTruthy()
    expect(getByText('Difficulty')).toBeTruthy()
    expect(getByText(gameLevel)).toBeTruthy()
  })
})
