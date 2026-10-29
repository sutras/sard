<template>
  <s-datetime-picker-popout
    v-model="date"
    v-model:visible="visible"
    title="取15的倍数的分钟数"
    type="hm"
    :filter="filter"
  />

  <s-list card>
    <s-list-item
      title="取15的倍数的分钟数"
      arrow
      hover
      :value="JSON.stringify(date)"
      @click="visible = true"
    />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DatetimeLetter } from 'sard'

const visible = ref(false)
const date = ref<Date>()

const filter = (letter: DatetimeLetter, value: number) => {
  if (letter === 'm') {
    return value % 15 === 0
  }
  return true
}
</script>
