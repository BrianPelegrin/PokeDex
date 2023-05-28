<script setup lang="ts">
import { useRoute } from 'vue-router'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import usePokemon from '../../shared/composables/usePokemon'
import { onMounted, ref, computed } from 'vue';
import type { IPokemon } from '@/modules/shared/interfaces'
const { params } = useRoute()
const pokemon = ref<IPokemon>()
const { getPokemonByName } = usePokemon()
interface IMovesList {
  name:string;
  url:string;
}
const movesList = computed<IMovesList[] | undefined>(()=> pokemon.value?.moves.map(move=>move.move))
onMounted(async () => {
  const name: string = params.name as string
  pokemon.value = await getPokemonByName(name)
  console.log(pokemon.value)
})
</script>
<template>
  <transition name="slide-fade">
    <div v-if="pokemon" class="d-flex justify-content-center">
      <div class="mx-5 pe-5">
        <el-link class="fs-2 border-bottom border-1" @click="$router.back()">
          <i class="bi fs-1 bi-arrow-left-short"></i> Go back
        </el-link>
      </div>
      <CustomCard
        :title="pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase())"
        :with-header="true"
        :with-bottom="false"
        height="500px"
        width="70rem"
      >
        <template #cardBody>
          <div class="row">
            <div class="col-lg-4 "  >
              <h3 class="text-center border-bottom">Informacion</h3>
              <el-scrollbar height="300px">
                <p><strong>Nombre: </strong>{{ pokemon.name }}</p>
              <!-- <p><strong>Especie: </strong>{{ pokemon.species.name }}</p> -->
              <p><strong>Habilidades: </strong>
                <ul>
                  <li v-for="hability in pokemon.abilities" :key="hability.ability.url">

                    <span v-if="hability.is_hidden"   class="item mt-2">
                      {{ hability.ability.name }} (oculta)
                    </span>
                    <span v-else>{{ hability.ability.name }}</span>
                  </li>
                </ul>
              </p>
              <p><strong>Tipos: </strong>
                <ul>
                  <li v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
                    {{ pokemonType.type.name }}
                  </li>
                </ul>
              </p>
             
              <p v-if="pokemon.held_items.length"><strong>Items: </strong>
                <ul>
                  <li v-for="{ item } in pokemon.held_items" :key="item.url">
                    {{ item.name }}
                  </li>
                </ul>
              </p>
              <p><strong>Altura: </strong> {{ pokemon.height }}</p>
  </el-scrollbar>
              

            </div>
       
            <div class="col-lg-4 "  >
              <h3 class="text-center border-bottom">Movimientos</h3>
              <el-table :data="movesList" height="250" style="width: 100%">    
              <el-table-column prop="name" label="Nombre" width="120" />
              <el-table-column prop="url" label="Url"  />
            </el-table>
            </div>
            <div class="col-lg-4  " >
              <h3 class="text-center border-bottom">Habilidades</h3>
              <el-table :data="pokemon.abilities" height="250" style="width: 100%">    
              <el-table-column prop="ability.name" label="Nombre" width="120" />
              <el-table-column prop="ability.url" label="Url"  />
            </el-table>
            </div>
          </div>
        </template>
      </CustomCard>
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
