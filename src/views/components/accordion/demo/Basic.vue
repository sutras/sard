<template>
  <s-accordion v-model="value">
    <s-accordion-item title="主轴参数" name="1" extra="自定义扩展">
      主轴转速 1200 rpm，振动 1.2 mm/s
    </s-accordion-item>
    <s-accordion-item title="液压参数" name="2">系统压力 12.5 MPa，油温 46 °C</s-accordion-item>
    <s-accordion-item title="冷却参数" name="3">冷却水温 21 °C，流量 18 L/min</s-accordion-item>
  </s-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
