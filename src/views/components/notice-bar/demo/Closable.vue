<template>
  <s-notice-bar closable @close="onClick">
    这是一条很长很长很长很长很长很长很长很长很长很长的公告！
  </s-notice-bar>
</template>

<script setup lang="ts">
import { toast } from 'sard'
const onClick = () => {
  toast('close')
}
</script>
