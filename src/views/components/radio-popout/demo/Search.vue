<template>
  <s-radio-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线"
    :options="options"
    searchable
    filter-placeholder="输入产线名称过滤"
    @change="onChange"
  />

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '选择产线' }}
      </template>
    </s-list-item>
    <s-list-item title="设置为：'line-3'（压铸四线）" arrow hover @click="value = 'line-3'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'line-1', label: '机加工一线' },
  { value: 'line-2', label: '注塑二线' },
  { value: 'line-3', label: '压铸四线' },
  { value: 'line-4', label: '包装五线' },
]

const visible = ref(false)
const value = ref<string>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
