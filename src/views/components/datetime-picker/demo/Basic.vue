<template>
  <s-list card>
    <s-list-item>
      <s-datetime-picker v-model="date" type="yMd" @change="onChange" />
    </s-list-item>
    <s-list-item title="当前值：" :value="date ? formatDate(date, 'YYYY-MM-DD') : String(date)" />
    <s-list-item title="设置为当前时间" arrow hover @click="date = new Date()" />
    <s-list-item title="清空" arrow hover @click="date = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const date = ref<Date>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
