<template>
  <!-- 工业语境：中性色（文本层级），车间强光环境下按层级区分字段名与数值 -->
  <s-flex wrap gap="medium">
    <ColorBox v-for="item in colors" :key="item.token" :name="item.name" :token="item.token" />
  </s-flex>
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const colors = [
  { name: '一级文本', token: '--s-text-color-primary' },
  { name: '二级文本', token: '--s-text-color-secondary' },
  { name: '三级文本', token: '--s-text-color-tertiary' },
  { name: '四级文本', token: '--s-text-color-fourth' },
  { name: '禁用文本', token: '--s-text-color-disabled' },
]
</script>
