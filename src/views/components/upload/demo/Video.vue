<template>
  <s-upload
    media-type="video"
    :model-value="[
      { url: industrialCncVideo },
      { url: industrialCncVideo },
      { url: industrialCncVideo },
    ]"
  />
</template>

<script setup lang="ts">
import industrialCncVideo from '@/assets/videos/industrial-cnc.mp4'
</script>
