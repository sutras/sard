<template>
  <s-segmented v-model="value" :options="options">
    <s-segmented-item v-for="option in options" :value="option.value">
      <demo-icon :name="option.icon" class="me-1" />
      {{ option.label }}
    </s-segmented-item>
  </s-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    label: '首页',
    value: 'home',
    icon: 'house-door-fill',
  },
  {
    label: '购物车',
    value: 'card',
    icon: 'cart-fill',
  },
  {
    label: '消息',
    value: 'message',
    icon: 'chat-dots-fill',
  },
]

const value = ref('home')
</script>
