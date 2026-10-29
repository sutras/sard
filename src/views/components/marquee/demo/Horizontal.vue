<template>
  <s-marquee direction="horizontal" :speed="100">
    <div v-for="(item, i) in data" :key="i" class="me-2 flex-none">
      <div>{{ item }}</div>
    </div>
  </s-marquee>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  'EQ-2023-204-JX-04-A 数控车床 CNC-Lathe-01',
  'EQ-2024-017-HJ-02-B 立式加工中心 CNC-Mill-02',
  'EQ-2022-118-ZS-07-C 注塑机-A2 注塑二线',
  'EQ-2024-031-HZ-01-A 六轴机械臂-R06 焊装三线',
])
</script>
