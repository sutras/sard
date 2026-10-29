<template>
  <s-list card>
    <s-list-item hover arrow title="顶部位置" @click="onTopToast" />
    <s-list-item hover arrow title="底部位置" @click="onBottomToast" />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onTopToast = () => {
  toast('E-1042 报警已推送至班组看板', {
    position: 'top',
  })
}

const onBottomToast = () => {
  toast('班前点检记录已归档', {
    position: 'bottom',
  })
}
</script>
