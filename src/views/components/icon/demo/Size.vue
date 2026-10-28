<template>
  <!-- 演示图标尺寸与显示距离：小=表格行内、中=移动巡检、大=车间大屏（3 m 外可辨） -->
  <s-flex align="center" gap="large">
    <Search class="text-base" aria-label="设备检索（表格行内）" data-surface="table" />
    <Search class="text-2xl" aria-label="设备检索（移动端）" data-surface="mobile" />
    <Search class="text-5xl" aria-label="设备检索（大屏）" data-surface="monitor" />
  </s-flex>
</template>

<script setup lang="ts">
import { Search } from '@sard/icons'
</script>
