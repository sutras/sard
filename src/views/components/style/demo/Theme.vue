<template>
  <s-flex wrap gap="medium">
    <ColorBox v-for="item in colors" :key="item.token" :name="item.name" :token="item.token" />
  </s-flex>
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const colors = [
  { name: '主题色', token: '--s-color-primary' },
  { name: '强调文本', token: '--s-text-color-emphasis' },
  { name: '容器底', token: '--s-bg-color-container' },
  { name: '页面底', token: '--s-bg-color-layout' },
  { name: '填充', token: '--s-fill-color' },
]
</script>
