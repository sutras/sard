<template>
  <doc-page gray title="默认展开以及默认选中">
    <s-tree
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      selectable
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
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

const defaultCheckedKeys = [110101, 120100]
const defaultExpandedKeys = [110101, 120100]
</script>
