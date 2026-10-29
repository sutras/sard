<template>
  <div style="position: relative; height: 240px">
    <s-watermark :image="image" :width="80" :height="80" />
  </div>
</template>

<script setup lang="ts">
import image from '@/assets/logo.svg'
</script>
