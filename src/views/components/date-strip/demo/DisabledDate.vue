<template>
  <s-list card>
    <s-list-item>
      <s-date-strip
        v-model="value"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :disabled-date="disabledDate"
      />
    </s-list-item>
    <s-list-item title="说明" value="仅开放工作日" />
    <s-list-item title="当前值" :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const value = ref<Date>()

const disabledDate = (date: Date) => {
  return [0, 6].includes(date.getDay())
}
</script>
