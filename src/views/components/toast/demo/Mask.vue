<template>
  <s-list card>
    <s-list-item hover arrow title="显示背景" @click="showOverlayToast" />
    <s-list-item hover arrow title="透明背景" @click="showTransparentOverlayToast" />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const showOverlayToast = () => {
  toast.loading('加载中', {
    overlay: true,
  })

  setTimeout(() => {
    toast.hide()
  }, 1500)
}

const showTransparentOverlayToast = () => {
  toast.loading('加载中', {
    overlay: true,
    transparent: true,
  })

  setTimeout(() => {
    toast.hide()
  }, 1500)
}
</script>
