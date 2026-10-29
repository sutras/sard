<template>
  <doc-page gray title="scroll-view 组件滚动">
    <div ref="scroll" class="overflow-y-auto" style="height: 60vh">
      <s-list card style="margin: 0 16px; padding: 16px 0">
        <s-list-item v-for="i in 30" :key="i" :title="i" />
      </s-list>
    </div>

    <s-back-top :scroll-top="scrollTop" @click="backTop" />
  </doc-page>
</template>

<script setup lang="ts">
import { useElementBackTop } from 'sard'
import { useTemplateRef } from 'vue'

const scrollRef = useTemplateRef('scroll')
const { scrollTop, backTop } = useElementBackTop(scrollRef)
</script>
