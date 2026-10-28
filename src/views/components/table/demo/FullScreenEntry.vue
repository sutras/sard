<template>
  <!-- 演示进入车间大屏点检标准表：从移动端列表跳转到满屏表格 -->
  <s-list aria-label="点检标准入口">
    <s-list-item title="点检与保养标准" arrow hover @click="navigateTo('FullScreen')" />
  </s-list>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/table/demo/${url}`)
}
</script>
