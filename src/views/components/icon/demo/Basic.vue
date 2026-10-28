<template>
  <!-- 演示告警图标：图标即实体/事件隐喻，三角警示对应设备报警，必须配 aria-label 供读屏识别 -->
  <WarningFill class="text-3xl" aria-label="设备报警" data-icon-meaning="device-alarm" />
</template>

<script setup lang="ts">
import { WarningFill } from '@sard/icons'
</script>
