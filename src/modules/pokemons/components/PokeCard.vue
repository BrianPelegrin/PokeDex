<template>
  <el-card :body-style="{ padding: '0px' }" :class="pokemon.types[0].type.name">
    <!-- <img
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
          style="width: 100%; display: block"
        /> -->
    <div style="padding: 14px">
      <el-row>
        <el-col :span="12" class="grid-content text-center d-flex justify-content-center">
          <span class="fw-bold text-white fs-3">{{
            pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase())
          }}</span>
        </el-col>
        <el-col :span="6" class="grid-content p-4">
          <el-button
            type="primary"
            class="mb-2"
            @click="
              () => {
                $router.push({ name: 'pokemon-view', params: { name: pokemon.name } })
              }
            "
          >
            Detalles del pokemon
          </el-button>

          <el-button type="success" @click="isVisible = true"> Mostrar Habilidades </el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>

  <el-dialog v-model="isVisible" :title="pokemon.name" width="50%" center>
    <el-table :data="pokemon.abilities" border style="width: 100%">
      <el-table-column prop="ability.name" label="Nombre" width="180" />
      <el-table-column prop="ability.url" label="Enlace" width="550" />
      <el-table-column label="Acciones" width="180">
        <template #default="ability">
          <el-button size="small" type="primary" @click="printHability(ability.row)"
            >Imprimir</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IPokemon } from '@/modules/shared/interfaces'
interface IPokeCardProps {
  pokemon: IPokemon
}
defineProps<IPokeCardProps>()
const printHability = (ability: any) => {
  console.log(ability)
}
const isVisible = ref<boolean>()
</script>

<style scoped>
.grass {
  background-color: #7ac74c;
}
.poison {
  background-color: #a33ea1;
}

.fire {
  background-color: #f56c6c;
}

.water {
  background-color: #409eff;
}
.ice {
  background-color: #96d9d6;
}

.fighting {
  background-color: #c22e28;
}

.ground {
  background-color: #e2bf65;
}

.flying {
  background-color: #a98ff3;
}

.psychic {
  background-color: #f95587;
}

.bug {
  background-color: #aabb21;
}

.ghost {
  background-color: #735797;
}

.dragon {
  background-color: #6f35fc;
}

.dark {
  background-color: #705746;
}

.steel {
  background-color: #b7b7ce;
}

.fairy {
  background-color: #b7b7ce;
}

.normal {
  background-color: #a8a77a;
}

.rock {
  background-color: #b6a136;
}

.electric {
  background-color: #f7d02c;
}
</style>
