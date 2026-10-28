<template>
  <!-- 工业语境：风险等级单选｜Basic 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-radio-input
        v-model="value"
        title="选择产线"
        placeholder="选择产线"
        clearable
        :options="options"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为：'line-3'（压铸四线）" arrow hover @click="value = 'line-3'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>()

const options = [
  { value: 'line-1', label: '机加工一线' },
  { value: 'line-2', label: '注塑二线' },
  { value: 'line-3', label: '压铸四线' },
  { value: 'line-4', label: '包装五线' },
]

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
