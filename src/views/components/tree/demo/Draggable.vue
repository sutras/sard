<template>
  <doc-page gray title="可拖拽的">
    <s-tree :data="treeData" :node-keys="{ title: 'name', key: 'code' }" draggable />
  </doc-page>
</template>

<script setup lang="ts">
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))
</script>
