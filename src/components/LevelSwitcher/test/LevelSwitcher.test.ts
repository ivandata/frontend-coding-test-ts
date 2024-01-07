// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import render from '@test/render'
import useSettingsStore from '@store/settings' // Adjust the import path as needed
import { GameLevel } from '@store/types' // Adjust the import path as needed
import { nextTick } from 'vue'
import { fireEvent } from '@testing-library/vue'
import GameLevelSwitcher from '../LevelSwitcher.vue'

describe('GameLevelSwitcher', () => {
  it('displays the current game level and changes it on button click', async () => {
    const { getByLabelText, getByText } = render(GameLevelSwitcher, {
      props: {
        isGameStarted: false,
        preparationTime: 0,
        gameTime: 0,
      },
      store: {
        settings: {
          initials: null,
          gameLevel: GameLevel.MEDIUM,
        },
      },
    })

    const settingsStore = useSettingsStore()

    await nextTick()
    expect(getByText(GameLevel.MEDIUM)).toBeTruthy()

    await fireEvent.click(getByLabelText('Increase game level'))
    expect(settingsStore.setGameLevel).toHaveBeenCalledWith(GameLevel.HARD)

    await fireEvent.click(getByLabelText('Decrease game level'))
    expect(settingsStore.setGameLevel).toHaveBeenCalledWith(GameLevel.MEDIUM)
  })
})
