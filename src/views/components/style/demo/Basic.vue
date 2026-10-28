<template>
  <!-- 工业语境：语义色令牌，报警/预警/运行等状态直接复用，不允许示例里写死色值 -->
  <s-flex wrap gap="medium">
    <ColorBox v-for="item in colors" :key="item.token" :name="item.name" :token="item.token" />
  </s-flex>
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const colors = [
  { name: '主色', token: '--s-color-primary' },
  { name: '辅助色', token: '--s-color-secondary' },
  { name: '成功', token: '--s-color-success' },
  { name: '警告', token: '--s-color-warning' },
  { name: '危险', token: '--s-color-danger' },
]
</script>
