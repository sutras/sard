<template>
  <doc-page gray title="仅选择叶子节点">
    <s-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      single-selectable
      leaf-only
      default-expand-all
      style="margin-top: 15px"
      @select="onSelect"
    />
  </doc-page>
</template>

<script setup lang="ts">
import { getRegionData } from 'region-data'
import { type TreeStateNode } from 'sard'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const onSelect = (key: number | string, node: TreeStateNode) => {
  console.log(key, node)
}
</script>
