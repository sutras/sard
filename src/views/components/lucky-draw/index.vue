<template>
  <doc-page title="LuckyDraw 幸运抽奖">
    <doc-demo title="九宫格">
      <BasicGrid />
    </doc-demo>
    <doc-demo title="自定义宫格行列">
      <GridSize />
    </doc-demo>
    <doc-demo title="大转盘">
      <Wheel />
    </doc-demo>
    <doc-demo title="老虎机">
      <SlotMechine />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import BasicGrid from './demo/BasicGrid.vue'
import GridSize from './demo/GridSize.vue'
import Wheel from './demo/Wheel.vue'
import SlotMechine from './demo/SlotMechine.vue'
</script>
