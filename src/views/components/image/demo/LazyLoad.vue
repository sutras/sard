<template>
  <!-- 工业语境：设备与报警现场图片｜LazyLoad 用法演示 -->
  <s-image :src="agvPhoto" width="80px" height="80px" loading="lazy"></s-image>
</template>

<script setup lang="ts">
import { agvPhoto } from '@/data/industrial-images'
</script>
