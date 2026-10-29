<template>
  <doc-page gray title="滚动时长">
    <s-list card style="margin: 0 16px; padding: 16px 0">
      <s-list-item v-for="i in 30" :key="i" :title="i" />
    </s-list>

    <s-back-top :scroll-top="scrollTop" @click="backTop" />
  </doc-page>
</template>

<script setup lang="ts">
import { usePageBackTop } from 'sard'

const { scrollTop, backTop } = usePageBackTop('instant')
</script>
