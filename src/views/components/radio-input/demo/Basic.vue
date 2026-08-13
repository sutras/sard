<template>
  <s-list card>
    <s-list-item>
      <s-radio-input
        v-model="value"
        title="请选择"
        placeholder="请选择"
        clearable
        :options="options"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为：'option3'" arrow hover @click="value = 'option3'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>()

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
