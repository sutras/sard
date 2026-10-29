<template>
  <s-list card title="多选（最多3天）">
    <s-list-item>
      <s-date-strip
        v-model="multipleValue"
        type="multiple"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :max-days="3"
        :over-max-days="onOverMaxDays"
      />
    </s-list-item>
    <s-list-item title="当前值" :value="formatValues(multipleValue)" />
  </s-list>

  <s-list card title="范围（最多5天）">
    <s-list-item>
      <s-date-strip
        v-model="rangeValue"
        type="range"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 20)"
        :max-days="5"
        :over-max-days="onOverMaxDays"
      />
    </s-list-item>
    <s-list-item title="当前值" :value="formatValues(rangeValue)" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate, toast } from 'sard'

const multipleValue = ref<Date[]>([])
const rangeValue = ref<Date[]>([])

const formatValues = (value: Date[]) => {
  return JSON.stringify(value.map((item) => formatDate(item, 'YYYY-MM-DD')))
}

const onOverMaxDays = () => {
  toast('已超过最大可选天数')
}
</script>
