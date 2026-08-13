<template>
  <s-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择日期"
    @change="onChange"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? formatDate(value, 'YYYY-MM-DD') : '请选择' }}
      </s-button>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为今天" arrow hover @click="value = new Date()" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const value = ref<Date | undefined>(new Date())
const visible = ref(false)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
