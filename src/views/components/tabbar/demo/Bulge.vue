<template>
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="首页" #icon>
      <demo-icon name="house-door-fill" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="购物车" #icon>
      <demo-icon name="cart-fill" />
    </s-tabbar-item>
    <s-tabbar-item @click="toast('点击了添加按钮')">
      <div class="bulge">
        <div class="cover"></div>
        <div class="button">
          <Plus class="text-5xl" />
        </div>
      </div>
      <span class="text">添加</span>
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
import { toast } from 'sard'
import { Plus } from '@sard/icons'

const value = ref(0)
</script>

<style lang="scss" scoped>
.bulge {
  position: absolute;
  top: 0;
  transform-origin: top center;
  transform: scale(0.5) translateY(-33%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: var(--s-tabbar-bg);
  box-shadow: inset 0 0 0 1px var(--s-border-color);

  &:active {
    opacity: 0.8;
  }
}

.cover {
  position: absolute;
  top: 33%;
  width: 100%;
  height: 70%;
  transform: translateY(1px);
  background-color: var(--s-tabbar-bg);
}

.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: var(--s-color-primary);
  color: var(--s-white);
}

.text {
  position: relative;
  margin-top: auto;
  margin-bottom: 5px;
}
</style>
