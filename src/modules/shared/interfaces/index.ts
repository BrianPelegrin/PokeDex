interface IPokemonResponse {
  count: number
  next: string
  previus: any
  results: { name: string; url: string }[]
}
interface IPokemon {
  id: number
  name: string
  isVisible: boolean
  order: number
  species: { name: string; url: string }
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[]
  base_experience: number
  forms: { name: string; url: string }[]
  game_indices: { game_index: number; version: { name: string; url: string } }[]
  moves: { move: { name: string; url: string } }[]
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }
  types: { slot: 1; type: { name: string; url: string } }[]
  held_items: { item: { name: string; url: string } }[]
  height: number
}

interface IRouteArray {
  routes: { routeName: string; displayName: string }[]
}
export type { IPokemon, IPokemonResponse, IRouteArray }
