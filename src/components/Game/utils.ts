import { GameLevel } from '@types/game'
import { ApiResponse, formatResults } from '@api/index'
import { CardProps } from './types'
import { GameDifficulty } from './config'

export const shuffleElements = (cardsCollection: CardProps[]) => {
  const result = cardsCollection
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const focusSibling = (
  element: Element | null,
  next: boolean,
  skipCount = 0,
) => {
  let elementToFocus = element
  for (let i = 0; i <= skipCount; i += 1) {
    if (!element) return
    elementToFocus = next
      ? elementToFocus?.nextElementSibling || null
      : elementToFocus?.previousElementSibling || null
  }

  ;(elementToFocus as HTMLElement)?.focus()
}

export const calculateScore = ({
  gameTime,
  scores,
  totalActions,
  totalCards,
}: {
  gameTime: number
  scores: number
  totalActions: number
  totalCards: number
}) => {
  if (!scores) return 0
  const timeScore = Math.max(0, gameTime * 10)
  const accuracyScore = scores * 50
  const perfectActions = 2 * totalCards
  const actionScore = Math.max(0, 500 - (totalActions - perfectActions) * 10)

  return timeScore + accuracyScore + actionScore
}

export const processCards = (
  data: ApiResponse,
  gameLevel: GameLevel,
): CardProps[] => {
  const results = formatResults(data)
  const cards = shuffleElements(results)
    .slice(0, GameDifficulty[gameLevel].cards)
    .flatMap((obj: CardProps) => [{ ...obj }, { ...obj }])

  return shuffleElements(cards)
}
