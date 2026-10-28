<template>
  <!-- 工业语境：厂区 / 车间 / 产线 / 工位四级定位｜Basic 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-cascader-input
        v-model="value"
        title="选择厂区 / 车间 / 产线 / 工位"
        placeholder="选择厂区 / 车间 / 产线 / 工位"
        clearable
        :options="options"
        :option-keys="optionKeys"
        :loading="loading"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为：1112（华东厂区 / 机加车间 / 机加工一线 / ST-04）"
      arrow
      hover
      @click="value = 1112"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree, type PlantNode as Node } from '@/data/plant-tree'

const regionData = plantTree

const options = ref<Node[]>([])
const loading = ref(true)

setTimeout(() => {
  options.value = regionData
  loading.value = false
}, 1500)

const value = ref<number | undefined>(3111)

const optionKeys = { label: 'name', value: 'code' }

const onChange = (value: any, selectedOptions: any) => {
  console.log('change', value, selectedOptions)
}
</script>
