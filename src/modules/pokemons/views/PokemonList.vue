<template>
  <transition name="slide-fade">
    <div v-if="!isLoading && onShowList" class="row">
      <div
        class="container-fluid bg-white mb-4 p-3 px-5"
        style="box-shadow: var(--el-box-shadow-lighter)"
      >
        <el-form>
          <el-form-item label="Buscar:">
            <el-input v-model="pokemonName" placeholder="Digite el nombre del pokemon..." />
          </el-form-item>
        </el-form>
      </div>
      <template v-if="pokemonList.length">
        <div
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          class="col-md-6 col-sm-12 col-lg-3 mb-2"
        >
          <PokeCard :pokemon="pokemon" />
        </div>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center">
          <CustomCard :with-header="false" :with-bottom="false">
            <template #cardBody>
              <el-row class="d-flex justify-content-center">
                <el-col :sm="12" :lg="12">
                  <el-result icon="info" title="Pokemon not found :(">
                    <template #sub-title>
                      <p>Please try with another name.</p>
                    </template>
                    <template #extra>
                      <el-button
                        type="primary"
                        @click="
                          () => {
                            pokemonName = ''
                          }
                        "
                        >Clear filter</el-button
                      >
                    </template>
                  </el-result>
                </el-col>
              </el-row>
            </template>
          </CustomCard>
        </div>
      </template>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="isLoading" class="d-flex justify-content-center">
      <CustomCard :with-header="false" :with-bottom="false">
        <template #cardBody>
          <div class="text-center">
            <div
              class="spinner-border text-primary"
              style="width: 3rem; height: 3rem"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <h3 style="font-weight: bold">Espere por favor...</h3>

            <span style="font-weight: bold">Capturando Pokemones...</span>
          </div>
        </template>
      </CustomCard>
    </div>
  </transition>
</template>

<script setup lang="ts">
import usePokemon from '@/modules/shared/composables/usePokemon'
import { onMounted, ref, computed } from 'vue'
import PokeCard from '@/modules/pokemons/components/PokeCard.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import type { IPokemon } from '@/modules/shared/interfaces'
const { getPokemonList, isLoading, pokemonArray } = usePokemon()
const onShowList = ref<boolean>(false)
const pokemonName = ref<string>('')
const pokemonList = computed<IPokemon[]>(() => {
  if (pokemonName.value != '') {
    return pokemonArray.value
      .filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName.value.toLowerCase()))
      .sort((a, b) => a.id - b.id)
  } else {
    return pokemonArray.value.map((x) => x).sort((a, b) => a.id - b.id)
  }
})
onMounted(async () => {
  onShowList.value = false
  await getPokemonList()
  onShowList.value = true
})
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

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
