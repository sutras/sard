<template>
  <!-- 演示图标颜色承担状态语义：红=报警，绿=联锁通过，黄=预警，不可随意改色 -->
  <s-flex align="center" gap="large">
    <WarningFill class="text-3xl text-red-600" aria-label="报警" data-state="ALARM" />
    <CheckCircleFill class="text-3xl text-green-600" aria-label="联锁验证通过" data-state="RUN" />
    <InfoCircleFill
      class="text-3xl text-amber-500"
      aria-label="参数越限预警"
      data-state="WARNING"
    />
  </s-flex>
</template>

<script setup lang="ts">
import { CheckCircleFill, InfoCircleFill, WarningFill } from '@sard/icons'
</script>
