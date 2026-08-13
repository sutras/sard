<template>
  <doc-page title="Loading 加载">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="加载类型">
      <Type />
    </doc-demo>

    <doc-demo title="加载文案">
      <Text />
    </doc-demo>

    <doc-demo title="垂直排布">
      <Vertical />
    </doc-demo>

    <doc-demo title="加载尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Custom />
    </doc-demo>

    <doc-demo title="进度">
      <Progress />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import Text from './demo/Text.vue'
import Vertical from './demo/Vertical.vue'
import Size from './demo/Size.vue'
import Color from './demo/Color.vue'
import Custom from './demo/Custom.vue'
import Progress from './demo/Progress.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-loading {
    margin-inline-end: 10px;
  }
}
</style>
