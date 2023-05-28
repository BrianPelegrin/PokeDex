<template>
  <div class="row bg-white" style="box-shadow: var(--el-box-shadow-light)">
    <div class="col-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
        style="width: 200px"
        class="ms-3 m-2 border-bottom border-2 pb-1 border-primary"
      />
    </div>
    <div class="col-8 align-self-end">
      <el-tabs
        v-model="$route.name"
        class="demo-tabs"
        style="padding-left: 30rem"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="{ routeName, displayName } in routes"
          :key="routeName"
          :label="displayName"
          :name="routeName"
        />
        <el-tab-pane label="Config" name="second" />
        <el-tab-pane label="Role" name="third" />
        <el-tab-pane label="Task" name="fourth" />
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus/lib/components/tabs/src/constants.js'
import { useRoute, useRouter } from 'vue-router'
import type { IRouteArray } from '@/modules/shared/interfaces'
const route = useRoute()
const router = useRouter()
const activeName = ref<any>(route.name)

defineProps<IRouteArray>()
onMounted(() => {
  activeName.value = route.name
  console.log(activeName.value)
})
const handleClick = (tab: TabsPaneContext) => {
  activeName.value = tab.paneName
  router.push({ name: tab.paneName?.toString() })
}
</script>

<style lang="css" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
<!-- <el-menu
    :default-active="1"
    class="el-menu-demo align-items-end w-100"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0"
      ><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"
        style="width: 200px"
        class="ms-3 p-2"
    /></el-menu-item>
    <div class="flex-grow" />
    <el-menu-item style="height: 100%" index="1">Pokemons</el-menu-item>
  </el-menu> -->
