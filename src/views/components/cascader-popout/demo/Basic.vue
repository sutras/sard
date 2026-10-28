<template>
  <!-- 工业语境：产线级联定位弹层｜Basic 用法演示 -->
  <s-cascader-popout
    v-model="value"
    v-model:visible="visible"
    title="选择厂区 / 车间 / 产线 / 工位"
    :options="regionData"
    :field-keys="{ label: 'name', value: 'code' }"
    @change="onChange"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '选择厂区 / 车间 / 产线 / 工位' }}
      </s-button>
    </s-list-item>
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
import { plantTree } from '@/data/plant-tree'
import { type CascaderOption } from 'sard'

const regionData = plantTree
const visible = ref(false)
const value = ref<number | undefined>(3111)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
