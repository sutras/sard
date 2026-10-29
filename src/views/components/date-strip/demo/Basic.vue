<template>
  <s-list card>
    <s-list-item>
      <s-date-strip v-model="value" @change="onChange" />
    </s-list-item>
    <s-list-item title="当前值：" :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'" />
    <s-list-item title="设置为今天" arrow hover @click="value = new Date()" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const value = ref<Date | undefined>(new Date())

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
