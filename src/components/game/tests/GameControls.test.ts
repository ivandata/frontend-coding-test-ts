// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import render from '@test/render'
import { fireEvent } from '@testing-library/vue'
import GameControls from '../GameControls.vue'

describe('GameControls', () => {
  it('renders and clicks start button when game is not started', async () => {
    const { getByLabelText, emitted } = render(GameControls, {
      props: {
        isLoading: false,
        isGameStarted: false,
        preparationTime: false,
      },
    })

    const startButton = getByLabelText('Start Game')
    await fireEvent.click(startButton)
    expect(emitted()).toHaveProperty('start')
  })

  it('renders and clicks reset button when game is started', async () => {
    const { getByLabelText, emitted } = render(GameControls, {
      props: {
        isLoading: false,
        isGameStarted: true,
        preparationTime: false,
      },
    })

    const resetButton = getByLabelText('Reset Game')
    await fireEvent.click(resetButton)
    expect(emitted()).toHaveProperty('reset')
  })
})
