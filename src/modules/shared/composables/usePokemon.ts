import PokeService from '@/api/PokeService'
import { ref } from 'vue'
import type { IPokemon, IPokemonResponse } from '@/modules/shared/interfaces'

const pokemonArray = ref<IPokemon[]>([])

const isLoading = ref<boolean>(false)
const isPokemonLoading = ref<boolean>(false)
const usePokemon = () => {
  const getPokemonList = async () => {
    if (pokemonArray.value.length) return

    isLoading.value = true

    const { data } = await PokeService.get<IPokemonResponse>('/pokemon?limit=102')
    const pokemonResponse: IPokemonResponse = data

    pokemonResponse.results.forEach(async (x) => {
      const pokemon = await getPokemonByName(x.name)
      if (pokemon) pokemonArray.value.push(pokemon)
    })

    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  const getPokemonByName = async (name: string): Promise<IPokemon | undefined> => {
    isPokemonLoading.value = true
    try {
      const { data } = await PokeService.get<IPokemon>(`/pokemon/${name}`)
      setTimeout(() => {
        isPokemonLoading.value = true
      }, 200)
      return data
    } catch (error: any) {
      console.log(error)
    }
    isPokemonLoading.value = true
    return undefined
  }

  return {
    pokemonArray,
    getPokemonList,
    isLoading,
    getPokemonByName,
    isPokemonLoading
  }
}

export default usePokemon
