<template>
  <doc-page gray title="BackTop 回到顶部">
    <doc-demo>
      <s-list card>
        <s-list-item title="基础用法" arrow hover @click="navigateTo('Basic')" />
        <s-list-item title="scroll-view 组件滚动" arrow hover @click="navigateTo('ScrollView')" />
        <s-list-item title="按钮位置" arrow hover @click="navigateTo('Position')" />
        <s-list-item title="滚动时长" arrow hover @click="navigateTo('Duration')" />
        <s-list-item title="可见时的高度" arrow hover @click="navigateTo('VisibleHeight')" />
        <s-list-item title="自定义按钮内容" arrow hover @click="navigateTo('CustomContent')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/back-top/demo/${url}`)
}
</script>
