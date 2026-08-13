<template>
  <s-navbar title="标题" show-back back-text="返回" @back="onBack" />
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onBack = () => {
  toast('返回上一页')
}
</script>
