<template>
  <s-notice-bar linkable @click="onClick">
    这是一条很长很长很长很长很长很长很长很长很长很长的公告！
  </s-notice-bar>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = () => {
  toast('navigate to')
}
</script>
