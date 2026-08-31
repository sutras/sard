<template>
  <s-tabbar v-model="value" active-color="var(--s-color-danger)">
    <s-tabbar-item :value="0" label="首页" #icon>
      <demo-icon name="house-door-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="购物车" #icon>
      <demo-icon name="cart-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="消息" #icon>
      <demo-icon name="chat-dots-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <demo-icon name="person-fill" />
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
