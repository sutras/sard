<template>
  <doc-page title="Text 文本">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
    <doc-demo title="文本颜色">
      <Color />
    </doc-demo>
    <doc-demo title="文本大小">
      <Size />
    </doc-demo>
    <doc-demo title="单行省略">
      <Truncated />
    </doc-demo>
    <doc-demo title="多行省略">
      <LineClamp />
    </doc-demo>
    <doc-demo title="自定义标签">
      <Tag />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Color from './demo/Color.vue'
import Size from './demo/Size.vue'
import Truncated from './demo/Truncated.vue'
import LineClamp from './demo/LineClamp.vue'
import Tag from './demo/Tag.vue'
</script>
