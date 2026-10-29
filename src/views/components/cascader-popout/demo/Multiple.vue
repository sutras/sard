<template>
  <s-cascader-popout
    v-model="value"
    v-model:visible="visible"
    title="选择厂区 / 车间 / 产线 / 工位"
    :options="regionData"
    :field-keys="{ label: 'name', value: 'code' }"
    multiple
    all-levels
    check-strictly
    @change="onChange"
  />

  <s-list card>
    <s-list-item
      :title="value ? JSON.stringify(value) : '选择厂区 / 车间 / 产线 / 工位'"
      arrow
      hover
      @click="visible = true"
    />
    <s-list-item
      title="设置为：[[1000, 1100, 1110, 1111], [1000, 1100, 1110, 1112]]（ST-01、ST-04）"
      arrow
      hover
      @click="
        value = [
          [1000, 1100, 1110, 1111],
          [1000, 1100, 1110, 1112],
        ]
      "
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree } from '@/data/plant-tree'
import { type CascaderOption, type CascaderValue } from 'sard'

const regionData = plantTree
const visible = ref(false)
const value = ref<CascaderValue | undefined>([
  [1000, 1100, 1110, 1111],
  [1000, 1100, 1110, 1112],
])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
