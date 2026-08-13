<template>
  <s-tabbar v-model:current="current">
    <s-tabbar-item :name="0" text="首页" #icon>
      <demo-icon name="house-door-fill" />
    </s-tabbar-item>
    <s-tabbar-item :name="1" text="购物车" #icon>
      <demo-icon name="cart-fill" />
    </s-tabbar-item>
    <s-tabbar-item :name="2" text="消息" #icon>
      <s-badge :value="5">
        <demo-icon name="chat-dots-fill" />
      </s-badge>
    </s-tabbar-item>
    <s-tabbar-item :name="3" text="我的" #icon>
      <s-badge dot>
        <demo-icon name="person-fill" />
      </s-badge>
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)
</script>
