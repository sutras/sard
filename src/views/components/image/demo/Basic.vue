<template>
  <s-image
    src="https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg"
    width="80px"
    height="80px"
  />
  <s-image :src="logo" width="80px" height="80px" />
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
</script>
