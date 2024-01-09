// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import render from '@test/render'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders correctly and responds to click events', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(BaseButton, {
      props: {
        ariaLabel: 'Test Button',
        isDisabled: false,
        onClick,
      },
    })

    const button = getByRole('button')

    await fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
