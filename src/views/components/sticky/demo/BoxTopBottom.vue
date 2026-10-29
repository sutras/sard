<template>
  <s-sticky-box
    style="
      display: flex;
      align-items: center;
      height: 300px;
      background: var(--s-fill-color-tertiary);
    "
  >
    <s-sticky
      :margin-top="-safeAreaInsets.top - 50"
      :margin-bottom="-40"
      style="margin-inline-start: 150px"
    >
      <s-button>容器中的吸顶和吸底</s-button>
    </s-sticky>
  </s-sticky-box>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
</script>
