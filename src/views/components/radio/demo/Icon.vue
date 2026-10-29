<template>
  <s-radio-group v-model="value">
    <s-radio v-for="item in list" :value="item.value" :key="item.value">
      <template #icon="{ checked }">
        <demo-icon size="20px" :name="checked ? 'user' : 'user'" />
      </template>
      {{ item.label }}
    </s-radio>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const list = [
  { label: '早班', value: 'option1' },
  { label: '中班', value: 'option2' },
]
</script>
