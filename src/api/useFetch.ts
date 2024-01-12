import axios, { AxiosError } from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { FetchReturnType } from './types'

export const useFetch = <T>(url: string): FetchReturnType<T> => {
  const isLoading = ref(false)
  const toast = useToast()
  const fetchData = async (): Promise<T> => {
    isLoading.value = true

    try {
      const response = await axios.get<T>(url)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      const message = axiosError?.message || 'Something wrong with connection'
      toast.error(message)

      // Handle the error in a way that the function still returns a Promise<T>
      // This could be returning a default value of type T, or rethrowing the error
      throw error // Rethrow the error or provide a default value of type T
    } finally {
      isLoading.value = false
    }
  }

  return { fetchData, isLoading }
}
