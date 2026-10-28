<template>
  <!-- 工业语境：批量选择设备或工单｜Search 用法演示 -->
  <s-checkbox-popout
    v-model="value"
    v-model:visible="visible"
    title="选择变更项"
    :options="options"
    searchable
    filter-placeholder="输入变更项名称过滤"
    @change="onChange"
  />

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '选择变更项' }}
      </template>
    </s-list-item>
    <s-list-item
      title="设置为：['process', 'inspection']"
      arrow
      hover
      @click="value = ['process', 'inspection']"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'process', label: '工艺参数' },
  { value: 'fixture', label: '工装夹具' },
  { value: 'program', label: '程序版本' },
  { value: 'inspection', label: '检验标准' },
  { value: 'tooling', label: '刀具补偿' },
  { value: 'cooling', label: '冷却参数' },
]

const visible = ref(false)
const value = ref<string[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
