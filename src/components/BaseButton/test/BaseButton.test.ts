// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import render from '@test/render'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders correctly and responds to click events', async () => {
    const { getByRole, emitted } = render(BaseButton, {
      props: {
        ariaLabel: 'Test Button',
        isDisabled: false,
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)
    expect(emitted()).toHaveProperty('buttonPress')
  })
})
