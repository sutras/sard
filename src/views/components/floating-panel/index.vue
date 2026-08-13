<template>
  <doc-page gray title="FloatingPanel 浮动面板">
    <doc-demo>
      <s-list card>
        <s-list-item title="基础用法" arrow hover @click="navigateTo('Basic')" />
        <s-list-item title="自定义锚点" arrow hover @click="navigateTo('Anchors')" />
        <s-list-item title="仅头部拖拽" arrow hover @click="navigateTo('ContentDraggable')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/floating-panel/demo/${url}`)
}
</script>
