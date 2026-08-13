<template>
  <template v-for="(node, index) of nodes" :key="node.key">
    <TreeNode v-if="node.visible" :index="index" :node="node" />
  </template>
</template>

<script setup lang="ts">
import { type TreeBranchProps } from './common'
import TreeNode from './tree-node.vue'

withDefaults(defineProps<TreeBranchProps>(), {})
</script>
