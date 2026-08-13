<template>
  <doc-page gray title="可编辑的">
    <div class="flex m-3 gap-3 justify-center">
      <s-button @click="addRootNode">添加根节点</s-button>
      <s-button @click="getCleanTreeData">获取树形数据</s-button>
    </div>
    <s-tree
      ref="treeRef"
      :data="treeData"
      :node-keys="{ title: 'name', key: 'code' }"
      draggable
      editable
    />
  </doc-page>
</template>

<script setup lang="ts">
import { getRegionData } from 'region-data'
import { toast, type TreeExpose } from 'sard'
import { ref } from 'vue'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const treeRef = ref<TreeExpose>()

const addRootNode = () => {
  treeRef.value?.addRootNode()
}

const getCleanTreeData = () => {
  toast('打开控制台查看')
  console.log(treeRef.value?.getCleanTreeData())
}
</script>
