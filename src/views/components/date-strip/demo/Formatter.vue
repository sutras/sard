<template>
  <s-list card>
    <s-list-item>
      <s-date-strip
        v-model="value"
        :min="new Date(2024, 0, 1)"
        :max="new Date(2024, 0, 15)"
        :formatter="formatter"
      />
    </s-list-item>
    <s-list-item title="当前值" :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate, type CalendarDay } from 'sard'

const value = ref(new Date(2024, 0, 6))

const formatter = (day: CalendarDay) => {
  if ([0, 6].includes(day.date.getDay())) {
    day.bottom = '休'
    day.style =
      day.type === 'selected'
        ? null
        : {
            backgroundColor: 'rgba(var(--s-color-warning-rgb), 0.08)',
            color: 'var(--s-color-warning)',
            borderColor: 'rgba(var(--s-color-warning-rgb), 0.2)',
          }
  }

  if (day.date.getDate() === 8) {
    day.top = '今天'
    day.bottom = '出发'
  }
}
</script>
