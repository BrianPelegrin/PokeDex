import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'main-home',
    component: () => import('@/modules/shared/layouts/MainLayout.vue'),
    children: [
      {
        path: 'pokemons',
        name: 'pokemons',
        component: () => import('@/modules/pokemons/views/PokemonList.vue')
      },
      {
        path: 'pokemons/:name',
        name: 'pokemon-view',
        component: () => import('@/modules/pokemons/views/PokemonView.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
