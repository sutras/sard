<template>
  <s-segmented v-model="value" :options="options">
    <s-segmented-item v-for="(option, index) in options" :key="index" :value="option.value">
      <div class="flex flex-col items-center py-1.5">
        <demo-icon :name="option.icon" />
        <div>{{ option.label }}</div>
      </div>
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
