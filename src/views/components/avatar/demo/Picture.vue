<template>
  <!-- 工业语境：当班人员与责任班组头像，编号与工号一一对应｜Picture 用法演示 -->
  <s-avatar :src="operatorPortraitPhoto" />
</template>

<script setup lang="ts">
import { operatorPortraitPhoto } from '@/data/industrial-images'
</script>
