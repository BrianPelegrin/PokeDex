<template>
  <div class="common-layout">
    <el-header>
      <NavBar
        :routes="[
          { displayName: 'Inicio', routeName: 'main-home' },
          { displayName: 'Pokemones', routeName: 'pokemons' },
          { displayName: 'Nosotros', routeName: 'about' },
          { displayName: 'Contacto', routeName: 'contact' }
        ]"
      />
    </el-header>

    <el-main class="my-5">
      <el-scrollbar class="p-2" height="800px">
        <router-view />
      </el-scrollbar>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/modules/shared/components/NavBar.vue'
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>
