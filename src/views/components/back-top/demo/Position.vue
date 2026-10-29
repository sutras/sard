<template>
  <doc-page gray title="按钮位置">
    <s-list card style="margin: 0 16px; padding: 16px 0">
      <s-list-item v-for="i in 30" :key="i" :title="i" />
    </s-list>

    <s-back-top :scroll-top="scrollTop" right="48px" bottom="96px" @click="backTop" />
  </doc-page>
</template>

<script setup lang="ts">
import { usePageBackTop } from 'sard'

const { scrollTop, backTop } = usePageBackTop()
</script>
