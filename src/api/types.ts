import { Ref, UnwrapRef } from 'vue'

export interface Pokemon {
  name: string
  url: string
}

export interface ApiResponse {
  results: Pokemon[]
}

export interface FetchReturnType<T> {
  isLoading: Ref<UnwrapRef<boolean>>
  fetchData: () => Promise<T>
}
