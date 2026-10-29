<template>
  <s-marquee style="height: 100px">
    <div v-for="(item, i) in list" :key="i" class="mb-2">
      {{ item }}
    </div>
  </s-marquee>

  <s-slider v-model="count" :min="0" :max="10" show-scale class="mt-6" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const devices = [
  'EQ-2023-204-JX-04-A 数控车床 CNC-Lathe-01',
  'EQ-2024-017-HJ-02-B 立式加工中心 CNC-Mill-02',
  'EQ-2022-118-ZS-07-C 注塑机-A2 注塑二线',
  'EQ-2024-031-HZ-01-A 六轴机械臂-R06 焊装三线',
  'EQ-2021-076-JG-09-D 三坐标测量机 CMM-09',
  'EQ-2023-155-JX-06-A 数控磨床 CNC-Grind-06',
  'EQ-2024-088-HJ-05-C 龙门铣 Gantry-Mill-05',
  'EQ-2022-203-ZS-11-B 吹塑机-B1 中空二线',
  'EQ-2024-012-HZ-03-A 激光焊接站 LW-03',
  'EQ-2023-099-JG-02-D 圆度仪 RT-02',
]

const count = ref(5)

const list = computed(() => devices.slice(0, count.value))
</script>
