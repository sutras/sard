<template>
  <doc-page gray title="严格的树节点过滤">
    <div style="padding: 16px; background: var(--s-bg-color-container)">
      <s-input v-model="searchString" placeholder="请输入过滤关键词" />
    </div>

    <s-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      filter-mode="strict"
    />
  </doc-page>
</template>

<script setup lang="ts">
import { type TreeExpose } from 'sard'
import { ref, watch } from 'vue'
import { getRegionData } from 'region-data'

const searchString = ref('')

const treeRef = ref<TreeExpose>()

watch(searchString, () => {
  treeRef.value?.filter(searchString.value)
})

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))
</script>
