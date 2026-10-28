<template>
  <!-- 工业语境：厂区 / 产线 / 设备树｜Accordion 用法演示 -->
  <doc-page gray title="手风琴">
    <s-tree :data="treeData" :node-keys="{ title: 'name', key: 'code' }" accordion />
  </doc-page>
</template>

<script setup lang="ts">
import { plantTree } from '@/data/plant-tree'

const regionData = plantTree

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))
</script>
