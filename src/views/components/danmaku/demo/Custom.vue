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
import { operatorPortraitPhoto } from '@/data/industrial-images'
import { ref } from 'vue'

const list = ref(
  [
    ['陈工', '换型用了 12 分钟'],
    ['小周', '夹具是液压的吧'],
    ['老李', '我们厂也是这台'],
    ['阿 May', '光洁度可以'],
    ['张工', '节拍能到多少'],
    ['小林', 'AGV 来补料了'],
    ['阿杰', '刚才那刀真快'],
    ['老王', '刀具是新磨的吧'],
  ].map(([name, text]) => ({
    name,
    text,
    avatar: operatorPortraitPhoto,
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
