<template>
  <!-- 工业语境：上传点检录像（数控车削过程录制，30 s 以内）｜Video 用法演示 -->
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
