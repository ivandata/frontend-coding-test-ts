// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import render from '@test/render'
import useSettingsStore from '@store/settings'
import { faker } from '@faker-js/faker'
import InitialInput from '../InitialInput.vue'

describe('InitialInput', () => {
  it('renders correctly and save initials', async () => {
    const { getByLabelText, getByPlaceholderText, emitted } =
      render(InitialInput)

    const settingsStore = useSettingsStore()

    const initials = faker.lorem.word(5)
    await fireEvent.update(getByPlaceholderText('Enter initials'), initials)
    await fireEvent.click(getByLabelText('Save initials'))

    expect(emitted()).toHaveProperty('save')
    expect(settingsStore.initials).toEqual(initials)
  })
})
