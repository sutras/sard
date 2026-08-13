<template>
  <doc-page gray title="Tree 树形">
    <doc-demo>
      <s-list card>
        <s-list-item title="基础用法" arrow hover @click="navigateTo('Basic')" />
        <s-list-item title="手风琴" arrow hover @click="navigateTo('Accordion')" />
        <s-list-item title="可选择的" arrow hover @click="navigateTo('Selectable')" />
        <s-list-item title="严格选择" arrow hover @click="navigateTo('CheckStrictly')" />
        <s-list-item
          title="默认展开以及默认选中"
          arrow
          hover
          @click="navigateTo('DefaultExpandedAndChecked')"
        />
        <s-list-item title="单一选择" arrow hover @click="navigateTo('Single')" />
        <s-list-item title="仅选择叶子节点" arrow hover @click="navigateTo('LeafOnly')" />
        <s-list-item title="可拖拽的" arrow hover @click="navigateTo('Draggable')" />
        <s-list-item title="可编辑的" arrow hover @click="navigateTo('Editable')" />
        <s-list-item title="异步编辑与拖拽" arrow hover @click="navigateTo('Async')" />
        <s-list-item title="树节点过滤" arrow hover @click="navigateTo('Filter')" />
        <s-list-item title="严格的树节点过滤" arrow hover @click="navigateTo('StrictFilter')" />
        <s-list-item title="懒加载" arrow hover @click="navigateTo('Lazy')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/tree/demo/${url}`)
}
</script>
