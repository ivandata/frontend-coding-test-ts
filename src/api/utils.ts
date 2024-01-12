import { Pokemon, ApiResponse } from './types'

export const formatResults = (data: ApiResponse) => {
  console.log(data)
  return data.results.map((pokemon: Pokemon) => {
    const parts = pokemon.url.split('/').filter(Boolean)
    const id = parts[parts.length - 1] || 0
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })
}
