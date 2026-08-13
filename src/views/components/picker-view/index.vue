<template>
  <doc-page gray title="PickerView 滚动选择器">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="多列选择">
      <Multiple />
    </doc-demo>

    <doc-demo title="自定义指示器样式">
      <CustomStyle />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Multiple from './demo/Multiple.vue'
import CustomStyle from './demo/CustomStyle.vue'
</script>
