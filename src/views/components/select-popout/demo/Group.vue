<template>
  <!-- 工业语境：设备多选弹层｜Group 用法演示 -->
  <s-select-popout v-model="value" v-model:visible="visible" title="选择产线" @change="onChange">
    <s-select-option-group
      v-for="group in regionData"
      :key="group.code"
      :label="group.name"
      :value="group.code"
    >
      <s-select-option
        v-for="item in group.children"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </s-select-option-group>
  </s-select-popout>

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '选择厂区 / 车间 / 产线 / 工位' }}
      </template>
    </s-list-item>
    <s-list-item title="设置为：1100（华东厂区 / 机加车间）" arrow hover @click="value = 1100" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree } from '@/data/plant-tree'

const regionData = plantTree.slice(0, 3)

const visible = ref(false)
const value = ref<number | undefined>(2100)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
