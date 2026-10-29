<template>
  <s-sticky-box style="height: 200px; background: var(--s-fill-color-tertiary)">
    <s-sticky :margin-top="-safeAreaInsets.top - 50" style="margin-inline-start: 150px">
      <s-button>容器中的吸顶</s-button>
    </s-sticky>
  </s-sticky-box>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
</script>
