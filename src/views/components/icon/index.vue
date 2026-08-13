<template>
  <doc-page title="Icon 图标">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="颜色">
      <Color />
    </doc-demo>

    <doc-demo title="图标集合">
      <IconSet />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Size from './demo/Size.vue'
import Color from './demo/Color.vue'
import IconSet from './demo/IconSet.vue'
</script>
