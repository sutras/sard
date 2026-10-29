<template>
  <s-marquee style="height: 100px">
    <div v-for="(item, i) in data" :key="i" class="mb-2">
      {{ item }}
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
  'EQ-2021-076-JG-09-D 三坐标测量机 CMM-09',
])
</script>
