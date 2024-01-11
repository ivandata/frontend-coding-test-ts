import axios from 'axios'
import { ref } from 'vue'

interface Pokemon {
  name: string
  url: string
}

export const formatResults = (data: { results: Pokemon[] }) => {
  return data.results.map((pokemon: Pokemon) => {
    const parts = pokemon.url.split('/').filter(Boolean)
    const id = parts[parts.length - 1] || 0
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })
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
