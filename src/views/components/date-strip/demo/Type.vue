<template>
  <s-list card title="单选">
    <s-list-item>
      <s-date-strip v-model="singleValue" />
    </s-list-item>
    <s-list-item
      title="当前值"
      :value="singleValue ? formatDate(singleValue, 'YYYY-MM-DD') : 'undefined'"
    />
  </s-list>

  <s-list card title="多选">
    <s-list-item>
      <s-date-strip v-model="multipleValue" type="multiple" />
    </s-list-item>
    <s-list-item title="当前值" :value="formatValues(multipleValue)" />
  </s-list>

  <s-list card title="范围选择">
    <s-list-item>
      <s-date-strip v-model="rangeValue" type="range" />
    </s-list-item>
    <s-list-item title="当前值" :value="formatValues(rangeValue)" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const singleValue = ref<Date | undefined>(new Date())
const multipleValue = ref<Date[]>([new Date()])
const rangeValue = ref<Date[]>([])

const formatValues = (value: Date[]) => {
  return JSON.stringify(value.map((item) => formatDate(item, 'YYYY-MM-DD')))
}
</script>
