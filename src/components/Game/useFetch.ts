import axios from 'axios'
import { ref } from 'vue'
import { GameLevel } from '@types/game'
import { CardProps } from './types'
import { shuffleElements } from './utils'
import { GameDifficulty } from './config'

export interface Pokemon {
  name: string
  url: string
}

export interface ApiResponse {
  data: { results: Pokemon[] }
}

export const formatResults = ({ data }: ApiResponse) => {
  return data.results.map((pokemon: Pokemon) => {
    const parts = pokemon.url.split('/').filter(Boolean)
    const id = parts[parts.length - 1] || 0
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })
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

export const useFetch = (url: string) => {
  const isLoading = ref(false)

  const fetchData = () => {
    isLoading.value = true

    return axios.get(url).finally(() => {
      isLoading.value = false
    })
  }

  return { fetchData, isLoading }
}
