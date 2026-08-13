<template>
  <s-space>
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
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    value: 'home',
    icon: 'house-door-fill',
  },
  {
    value: 'card',
    icon: 'cart-fill',
  },
  {
    value: 'message',
    icon: 'chat-dots-fill',
  },
]

const value = ref('home')
</script>
