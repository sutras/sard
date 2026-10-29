<template>
  <s-navbar title="设备参数" show-back back-text="返回" @back="onBack" />
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onBack = () => {
  toast('返回上一页')
}
</script>
