// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import render from '@test/render'
import { nextTick } from 'vue'
import { faker } from '@faker-js/faker'
import GameBoard from '../GameBoard.vue'

describe('GameBoard', () => {
  const cards = [
    { name: faker.commerce.productName(), image: faker.image.url() },
    { name: faker.commerce.productName(), image: faker.image.url() },
  ]

  beforeEach(() => {
    render(GameBoard, {
      props: {
        cards,
        updateGame: vi.fn(),
        isBoardBlocked: false,
      },
    })
  })

  it('renders all cards', async () => {
    const { getAllByAltText } = render(GameBoard, {
      props: {
        cards,
        updateGame: vi.fn(),
        isBoardBlocked: false,
      },
    })

    await nextTick()

    expect(getAllByAltText(cards[0].name).length).toEqual(2)
    expect(getAllByAltText(cards[1].name).length).toEqual(2)
  })

  it('handles card click', async () => {
    const { getAllByAltText } = render(GameBoard, {
      props: {
        cards,
        updateGame: vi.fn(),
        isBoardBlocked: false,
      },
    })

    const cardElement = getAllByAltText(cards[0].name)
    await fireEvent.click(cardElement[0])
    await fireEvent.click(cardElement[0])
  })

  // add more test
})
