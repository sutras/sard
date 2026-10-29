<template>
  <s-list card>
    <s-list-item>
      <s-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
        all-levels
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为：1112（华东厂区 / 机加车间 / 机加工一线 / ST-04）"
      arrow
      hover
      @click="value = [1000, 1100, 1110, 1112]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree } from '@/data/plant-tree'
import { type CascaderOption } from 'sard'

const regionData = plantTree
const value = ref<number[] | undefined>([3000, 3100, 3110, 3112])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
