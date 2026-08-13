<template>
  <doc-page gray title="Accordion 手风琴">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="展开多个" full>
      <Multiple />
    </doc-demo>

    <doc-demo title="禁用" full>
      <Disabled />
    </doc-demo>

    <doc-demo title="隐藏边框" full>
      <HideBorder />
    </doc-demo>

    <doc-demo title="插槽" full>
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Multiple from './demo/Multiple.vue'
import Disabled from './demo/Disabled.vue'
import HideBorder from './demo/HideBorder.vue'
import Slot from './demo/Slot.vue'
</script>
