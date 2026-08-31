<template>
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="首页" #icon>
      <demo-icon v-if="value === 0" name="house-door-fill" />
      <demo-icon v-else name="house-door" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="购物车" #icon>
      <demo-icon v-if="value === 1" name="cart-fill" />
      <demo-icon v-else name="cart" />
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="消息" #icon>
      <demo-icon v-if="value === 2" name="chat-dots-fill" />
      <demo-icon v-else name="chat-dots" />
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <demo-icon v-if="value === 3" name="person-fill" />
      <demo-icon v-else name="person" />
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
