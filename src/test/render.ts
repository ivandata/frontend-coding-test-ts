import { render as _render, RenderResult } from '@testing-library/vue'
import { vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { Component } from 'vue'

interface RenderOptions {
  props?: Record<string, any>
  store?: Record<string, any>
  stubActions?: boolean
}

export default function render(
  component: Component,
  options: RenderOptions = {},
): RenderResult {
  const { props = {}, store = {}, stubActions = false } = options

  const testingPinia = createTestingPinia({
    createSpy: vi.fn,
    stubActions,
    initialState: store,
  })

  return _render(component, {
    props,
    global: {
      plugins: [testingPinia],
    },
  } as RenderOptions)
}
