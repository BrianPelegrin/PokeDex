import axios from 'axios'

const PokeService = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export default PokeService
