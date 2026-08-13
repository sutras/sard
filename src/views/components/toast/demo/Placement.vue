<template>
  <s-list card>
    <s-list-item hover arrow title="顶部位置" @click="onTopToast" />
    <s-list-item hover arrow title="底部位置" @click="onBottomToast" />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onTopToast = () => {
  toast('顶部位置', {
    position: 'top',
  })
}

const onBottomToast = () => {
  toast('底部位置', {
    position: 'bottom',
  })
}
</script>
