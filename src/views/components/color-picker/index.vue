<template>
  <doc-page gray title="ColorPicker 颜色选择器">
    <doc-demo title="基础用法">
      <Basic />
    </doc-demo>

    <doc-demo title="选择透明度">
      <Alpha />
    </doc-demo>

    <doc-demo title="预定义颜色">
      <Presets />
    </doc-demo>

    <doc-demo title="自定义预定义颜色">
      <CustomPresets />
    </doc-demo>

    <doc-demo title="颜色的格式">
      <Formats />
    </doc-demo>

    <doc-demo title="允许切换格式">
      <ShowFormats />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Alpha from './demo/Alpha.vue'
import Basic from './demo/Basic.vue'
import Formats from './demo/Formats.vue'
import Presets from './demo/Presets.vue'
import CustomPresets from './demo/CustomPresets.vue'
import ShowFormats from './demo/ShowFormats.vue'
</script>
