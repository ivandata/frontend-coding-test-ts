import axios from 'axios'
import { ref } from 'vue'
import { CardProps } from './types'

interface Pokemon {
  name: string
  url: string
}

export const preparePokemons = (data: { results: Pokemon[] }) => {
  const results = data.results.map((pokemon: Pokemon) => {
    const parts = pokemon.url.split('/').filter(Boolean)
    const id = parts[parts.length - 1] || 0
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })
  return results.flatMap((obj: CardProps) => [{ ...obj }, { ...obj }])
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
