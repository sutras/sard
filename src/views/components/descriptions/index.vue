<template>
  <doc-page title="Descriptions 描述列表">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="带边框">
      <Bordered />
    </doc-demo>

    <doc-demo title="带冒号">
      <Colon />
    </doc-demo>

    <doc-demo title="标签对齐">
      <Align />
    </doc-demo>

    <doc-demo title="多列布局">
      <Columns />
    </doc-demo>

    <doc-demo title="合并列">
      <Colspan />
    </doc-demo>

    <doc-demo title="合并行">
      <Rowspan />
    </doc-demo>

    <doc-demo title="自定义插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Bordered from './demo/Bordered.vue'
import Colon from './demo/Colon.vue'
import Columns from './demo/Columns.vue'
import Colspan from './demo/Colspan.vue'
import Rowspan from './demo/Rowspan.vue'
import Slot from './demo/Slot.vue'
import Align from './demo/Align.vue'
</script>
