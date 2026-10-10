<template>
  <div class="danmaku-box">
    <s-danmaku :list="list" :rows="4" :speed="120" loop>
      <template #item="{ item }">
        <div class="bullet">
          <img class="bullet-avatar" :src="item.avatar" alt="" />
          <span class="bullet-name">{{ item.name }}</span>
          <span class="bullet-text">{{ item.text }}</span>
        </div>
      </template>
    </s-danmaku>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref(
  [
    ['小明', '小明送出火箭 x1'],
    ['小红', '小红送出跑车 x2'],
    ['小刚', '小刚送出玫瑰 x66'],
    ['小美', '小美送出爱心 x520'],
    ['阿伟', '阿伟送出飞机 x1'],
    ['阿花', '阿花送出皇冠 x3'],
    ['老铁', '老铁送出啤酒 x10'],
    ['小玉', '小玉送出星星 x99'],
  ].map(([name, text]) => ({
    name,
    text,
    avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${name}`,
  })),
)
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}

.bullet {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.45);

  .bullet-avatar {
    width: 20px;
    height: 20px;
    margin-inline-end: 6px;
    border-radius: 50%;
  }

  .bullet-name {
    margin-inline-end: 6px;
    color: #9ed6ff;
    font-size: 12px;
  }

  .bullet-text {
    font-size: 12px;
  }
}
</style>
