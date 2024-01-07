// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import render from '@test/render'
import useSettingsStore from '@store/settings'
import { GameLevel } from '@store/types'
import { nextTick } from 'vue'
import { faker } from '@faker-js/faker'
import GameHeader from '../GameHeader.vue'

describe('GameHeader', () => {
  const initials = faker.lorem.word(3)
  const gameLevel = faker.helpers.arrayElement(Object.values(GameLevel))

  it('renders initials and game level correctly', async () => {
    const { getByText } = render(GameHeader)

    // Mock settings
    const settingsStore = useSettingsStore()
    settingsStore.initials = initials
    settingsStore.gameLevel = gameLevel

    await nextTick()

    expect(getByText('Initials')).toBeTruthy()
    expect(getByText(initials)).toBeTruthy()
    expect(getByText('Difficulty')).toBeTruthy()
    expect(getByText(gameLevel)).toBeTruthy()
  })
})
