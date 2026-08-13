<template>
  <doc-page gray title="PullDownRefresh 下拉刷新">
    <doc-demo>
      <s-list card>
        <s-list-item title="基于页面的刷新" arrow hover @click="navigateTo('Page')" />
        <s-list-item title="基于滚动元素的刷新" arrow hover @click="navigateTo('ScrollView')" />
        <s-list-item title="自定义插槽" arrow hover @click="navigateTo('Slot')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/pull-down-refresh/demo/${url}`)
}
</script>
