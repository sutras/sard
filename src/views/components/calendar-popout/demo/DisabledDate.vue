<template>
  <!-- 工业语境：保养计划日期弹层选择｜DisabledDate 用法演示 -->
  <s-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线日期"
    :disabled-date="disabledDate"
    value-format="YYYY-MM-DD"
  />

  <s-list card>
    <s-list-item
      title="选择产线日期"
      arrow
      hover
      :value="JSON.stringify(value)"
      @click="visible = true"
    />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date>()
const visible = ref(false)

const disabledDate = (date: Date) => {
  return /0|6/.test(String(date.getDay()))
}
</script>
