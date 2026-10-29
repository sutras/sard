<template>
  <s-select-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线"
    multiple
    show-toolbar
    @change="onChange"
  >
    <s-select-option
      v-for="item in regionData"
      :key="item.code"
      :label="item.name"
      :value="item.code"
    />
  </s-select-popout>

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '选择厂区 / 车间 / 产线 / 工位' }}
      </template>
    </s-list-item>
    <s-list-item
      title="设置为：[1000, 2000]（华东厂区、华南厂区）"
      arrow
      hover
      @click="value = [1000, 2000]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree } from '@/data/plant-tree'

const regionData = plantTree

const visible = ref(false)
const value = ref<number[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
