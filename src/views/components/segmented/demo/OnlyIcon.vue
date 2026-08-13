<template>
  <s-segmented v-model="value" :options="options">
    <s-segmented-item v-for="option in options" :value="option.value">
      <demo-icon :name="option.icon" />
    </s-segmented-item>
  </s-segmented>

  <div class="flex mt-5">
    <s-segmented v-model="value" :options="options">
      <s-segmented-item v-for="option in options" :value="option.value">
        <demo-icon :name="option.icon" />
      </s-segmented-item>
    </s-segmented>
  </div>
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
