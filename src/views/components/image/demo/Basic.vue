<template>
  <!-- 工业语境：设备与报警现场图片｜Basic 用法演示 -->
  <s-image :src="cncLathePhoto" width="80px" height="80px" />
  <s-image :src="logo" width="80px" height="80px" />
</template>

<script setup lang="ts">
import { cncLathePhoto } from '@/data/industrial-images'
import logo from '@/assets/logo.png'
</script>
