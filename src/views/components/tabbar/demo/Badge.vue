<template>
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="首页" #icon>
      <demo-icon name="house-door-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="购物车" #icon>
      <demo-icon name="cart-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="消息" #icon>
      <s-badge :value="5">
        <demo-icon name="chat-dots-fill" />
      </s-badge>
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <s-badge dot>
        <demo-icon name="person-fill" />
      </s-badge>
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
