<template>
  <doc-page gray title="严格选择">
    <s-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      selectable
      check-strictly
    />
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
