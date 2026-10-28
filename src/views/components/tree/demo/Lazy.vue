<template>
  <!-- 工业语境：厂区 / 产线 / 设备树｜Lazy 用法演示 -->
  <doc-page gray title="懒加载">
    <s-tree
      lazy
      :load="loadNode"
      :node-keys="{ title: 'name', key: 'code', isLeaf: 'leaf' }"
      selectable
    />
  </doc-page>
</template>

<script setup lang="ts">
import { findPlantNode, plantTree } from '@/data/plant-tree'
import { type TreeStateNode } from 'sard'

const doGetTreeData = (parentId?: number) => {
  const nodes = parentId ? (findPlantNode(parentId)?.children ?? []) : plantTree

  return nodes.map(({ code, name, children }) => ({ code, name, isLeaf: !children }))
}

const getTreeData = (parentId?: number) => {
  return new Promise<ReturnType<typeof doGetTreeData>>((resolve) => {
    setTimeout(() => {
      resolve(doGetTreeData(parentId))
    }, 500)
  })
}

const loadNode = async (node?: TreeStateNode) => {
  const treeData = await getTreeData(node?.key as number)
  return treeData.map(({ code, name, isLeaf }) => ({ code, name, leaf: isLeaf }))
}
</script>
