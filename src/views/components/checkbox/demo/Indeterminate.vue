<template>
  <!-- 工业语境：点检项与安全前置勾选｜Indeterminate 用法演示 -->
  <s-checkbox
    v-model:checked="allChecked"
    :indeterminate="isIndeterminate"
    style="margin-bottom: 20px"
    @change="onAllChange"
  >
    全选点检项
  </s-checkbox>

  <s-checkbox-group v-model="checkedResult">
    <s-checkbox v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </s-checkbox>
  </s-checkbox-group>
</template>

<script setup lang="ts">
import { useIndeterminate } from 'sard'
import { ref } from 'vue'

const checkedResult = ref(['option2'])

const options = [
  { value: 'option1', label: '导轨油位' },
  { value: 'option2', label: '主轴温度' },
  { value: 'option3', label: '振动值' },
]

const { allChecked, isIndeterminate, onAllChange } = useIndeterminate(checkedResult, options)
</script>
