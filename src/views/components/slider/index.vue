<template>
  <doc-page title="Slider 滑块">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="范围选择">
      <Range />
    </doc-demo>

    <doc-demo title="显示值">
      <ShowValue />
    </doc-demo>

    <doc-demo title="最大最小值">
      <MinMax />
    </doc-demo>

    <doc-demo title="垂直">
      <Vertical />
    </doc-demo>

    <doc-demo title="步长">
      <Step />
    </doc-demo>

    <doc-demo title="显示刻度">
      <ShowScale />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="自定义尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="自定义按钮插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Range from './demo/Range.vue'
import ShowValue from './demo/ShowValue.vue'
import MinMax from './demo/MinMax.vue'
import Vertical from './demo/Vertical.vue'
import Step from './demo/Step.vue'
import ShowScale from './demo/ShowScale.vue'
import Color from './demo/Color.vue'
import Size from './demo/Size.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Slot from './demo/Slot.vue'
</script>
