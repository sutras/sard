<template>
  <!-- 工业语境：厂区 → 车间 → 产线 → 工位，逐级请求下级数据｜Lazy 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-cascader
        lazy
        :load="loadNode"
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        @change="onChange"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { findPlantNode, plantTree } from '@/data/plant-tree'
import { type CascaderOption, type CascaderStateNode } from 'sard'

const getTreeData = (parentId?: number) => {
  const nodes = parentId ? (findPlantNode(parentId)?.children ?? []) : plantTree

  return new Promise<{ code: number; name: string; isLeaf: boolean }[]>((resolve) => {
    setTimeout(() => {
      resolve(nodes.map(({ code, name, children }) => ({ code, name, isLeaf: !children })))
    }, 400)
  })
}

const loadNode = (node?: CascaderStateNode) => getTreeData(node?.key as number)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
