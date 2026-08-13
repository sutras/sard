<template>
  <doc-page title="Stepper 步进器">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="最大最小值">
      <MinMax />
    </doc-demo>

    <doc-demo title="步长">
      <Step />
    </doc-demo>

    <doc-demo title="精度">
      <Precision />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="变体">
      <Variant />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import MinMax from './demo/MinMax.vue'
import Step from './demo/Step.vue'
import Precision from './demo/Precision.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Size from './demo/Size.vue'
import Variant from './demo/Variant.vue'
</script>
