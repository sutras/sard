<template>
  <s-flex gap="medium">
    <s-segmented v-model="value" :options="options" direction="vertical">
      <s-segmented-item v-for="option in options" :value="option.value">
        {{ option.value }}
      </s-segmented-item>
    </s-segmented>

    <s-segmented v-model="value" :options="options" direction="vertical">
      <s-segmented-item v-for="option in options" :value="option.value">
        <demo-icon :name="option.icon" />
      </s-segmented-item>
    </s-segmented>
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    value: 'device',
    icon: 'warehouse',
  },
  {
    value: 'order',
    icon: 'work-order',
  },
  {
    value: 'alarm',
    icon: 'alarm',
  },
]

const value = ref('device')
</script>
