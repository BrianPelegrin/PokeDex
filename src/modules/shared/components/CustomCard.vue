<script setup lang="ts">
interface ICardProps {
  title?: string
  withHeader: boolean
  withBottom: boolean
  height?: string
  width?: string
}
defineProps<ICardProps>()
</script>

<template>
  <el-card :style="`height: ${height}; width:${width};`" class="box-card">
    <template v-if="withHeader" #header>
      <div class="card-header">
        <h3>{{ title }}</h3>
        <slot name="cardheader"></slot>
      </div>
    </template>
    <div>
      <slot name="cardBody"> </slot>
    </div>
    <template v-if="withBottom">
      <div class="bottom">
        <slot name="cardBottom"></slot>
      </div>
    </template>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
