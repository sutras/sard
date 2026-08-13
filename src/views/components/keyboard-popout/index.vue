<template>
  <doc-page gray title="KeyboardPopout 键盘弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="插槽">
      <Slot />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>

    <doc-demo title="车牌号键盘">
      <Plate />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Slot from './demo/Slot.vue'
import Type from './demo/Type.vue'
import Plate from './demo/Plate.vue'
</script>
