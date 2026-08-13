<template>
  <doc-page gray title="自定义按钮内容">
    <s-list card style="margin: 0 16px; padding: 16px 0">
      <s-list-item v-for="i in 30" :key="i" :title="i" />
    </s-list>

    <s-back-top :scroll-top="scrollTop" @click="backTop">
      <span style="font-size: var(--s-font-size)">回到顶部</span>
    </s-back-top>
  </doc-page>
</template>

<script setup lang="ts">
import { usePageBackTop } from 'sard'

const { scrollTop, backTop } = usePageBackTop()
</script>
