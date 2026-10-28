<template>
  <!-- 工业语境：车间广播滚动｜Countries 用法演示 -->
  <div class="grid grid-cols-4 gap-y-2 gap-x-3">
    <div
      v-for="name in countryNamesCN"
      class="flex justify-center py-1 px-2 border border-(--s-border-color)"
    >
      <s-marquee direction="horizontal" :speed="50">
        <div class="mx-1 text-sm">{{ name }}</div>
      </s-marquee>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countryNamesCN } from '@/data/countryNames'
</script>
