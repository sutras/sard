<template>
  <s-tag color="primary" closable @close="onClose">标签</s-tag>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClose = () => {
  toast('关闭')
}
</script>
