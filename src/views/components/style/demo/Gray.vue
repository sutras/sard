<template>
  <!-- 工业语境：灰度色令牌，用于卡片、分隔线与看板底色分层 -->
  <s-flex wrap gap="medium">
    <ColorBox v-for="item in colors" :key="item.token" :name="item.name" :token="item.token" />
  </s-flex>
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const colors = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(
  (step) => ({
    name: `gray-${step}`,
    token: `--s-gray-${step}`,
  }),
)
</script>
