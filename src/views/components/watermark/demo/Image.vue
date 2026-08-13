<template>
  <div style="position: relative; height: 240px">
    <s-watermark :image="image" :width="126" :height="36" />
  </div>
</template>

<script setup lang="ts">
import image from '@/assets/logo-name.png'
</script>
