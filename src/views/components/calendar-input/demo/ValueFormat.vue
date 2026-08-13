<template>
  <s-list card>
    <s-list-item>
      <s-calendar-input
        v-model="value"
        title="请选择日期"
        placeholder="请选择日期"
        clearable
        value-format="YYYY/MM/DD"
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为 2025/01/01" arrow hover @click="value = '2025/01/01'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>('')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
