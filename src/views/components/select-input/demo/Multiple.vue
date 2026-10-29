<template>
  <s-list card>
    <s-list-item>
      <s-select-input
        v-model="value"
        title="选择产线"
        placeholder="选择产线"
        clearable
        multiple
        show-toolbar
        :max-labels="3"
        :options="regionData"
        :option-keys="{ label: 'name', value: 'code', children: '' }"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
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

const value = ref<number[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
