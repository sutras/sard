<template>
  <doc-page title="InfiniteList 无限列表">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="下拉刷新">
      <Refresh />
    </doc-demo>

    <doc-demo title="空数据">
      <Empty />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Empty from './demo/Empty.vue'
import Refresh from './demo/Refresh.vue'
</script>
