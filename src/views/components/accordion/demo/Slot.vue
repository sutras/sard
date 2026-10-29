<template>
  <s-accordion v-model="value">
    <s-accordion-item name="1" extra="自定义扩展">
      <template #title>
        <div class="flex items-center text-(--s-color-primary)">
          <PencilSquare />
          <span class="ms-2">主轴参数</span>
        </div>
      </template>
      主轴转速 1200 rpm，振动 1.2 mm/s
    </s-accordion-item>
    <s-accordion-item title="液压参数" name="2">
      <template #extra>
        <div class="flex items-center text-(--s-color-primary)">
          <span class="me-2">自定义扩展</span>
          <QuestionCircleFill />
        </div>
      </template>
      系统压力 12.5 MPa，油温 46 °C
    </s-accordion-item>
    <s-accordion-item title="冷却参数" name="3">
      <template #arrow="{ visible }">
        <DoubleUp v-if="visible" />
        <DoubleDown v-else />
      </template>
      冷却水温 21 °C，流量 18 L/min
    </s-accordion-item>
  </s-accordion>
</template>

<script setup lang="ts">
import { DoubleDown, DoubleUp, PencilSquare, QuestionCircleFill } from '@sard/icons'
import { ref } from 'vue'

const value = ref('1')
</script>
