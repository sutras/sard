<template>
  <s-calendar-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线日期"
    :min="new Date(2000, 0, 7)"
    :max="new Date(2000, 0, 21)"
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

const value = ref<string>()
const visible = ref(false)
</script>
