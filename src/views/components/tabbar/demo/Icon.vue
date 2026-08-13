<template>
  <s-tabbar v-model:current="current">
    <s-tabbar-item :name="0" text="首页" #icon>
      <demo-icon v-if="current === 0" name="house-door-fill" />
      <demo-icon v-else name="house-door" />
    </s-tabbar-item>
    <s-tabbar-item :name="1" text="购物车" #icon>
      <demo-icon v-if="current === 1" name="cart-fill" />
      <demo-icon v-else name="cart" />
    </s-tabbar-item>
    <s-tabbar-item :name="2" text="消息" #icon>
      <demo-icon v-if="current === 2" name="chat-dots-fill" />
      <demo-icon v-else name="chat-dots" />
    </s-tabbar-item>
    <s-tabbar-item :name="3" text="我的" #icon>
      <demo-icon v-if="current === 3" name="person-fill" />
      <demo-icon v-else name="person" />
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)
</script>
