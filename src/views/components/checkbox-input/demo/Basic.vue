<template>
  <!-- 工业语境：安全前置项勾选（光栅自检 / 急停回路）｜Basic 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-checkbox-input
        v-model="value"
        title="选择变更项"
        placeholder="选择变更项（可多选）"
        clearable
        :options="options"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
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

const value = ref<string[]>()

const options = [
  { value: 'process', label: '工艺参数' },
  { value: 'fixture', label: '工装夹具' },
  { value: 'program', label: '程序版本' },
  { value: 'inspection', label: '检验标准' },
  { value: 'tooling', label: '刀具补偿' },
  { value: 'cooling', label: '冷却参数' },
]

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
