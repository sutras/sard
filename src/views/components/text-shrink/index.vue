<template>
  <doc-page gray title="TextShrink 文本缩放">
    <doc-demo title="基础用法">
      <Basic />
    </doc-demo>

    <doc-demo title="多行缩放">
      <MaxLines />
    </doc-demo>

    <doc-demo title="指定基准字号">
      <BaseFontSize />
    </doc-demo>

    <doc-demo title="容器宽度变化">
      <Resize />
    </doc-demo>

    <doc-demo title="文案动态变化">
      <Dynamic />
    </doc-demo>

    <doc-demo title="缩放下限与截断">
      <Overflow />
    </doc-demo>

    <doc-demo title="设置最小可读字号">
      <MinFontSize />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import BaseFontSize from './demo/BaseFontSize.vue'
import Dynamic from './demo/Dynamic.vue'
import MaxLines from './demo/MaxLines.vue'
import MinFontSize from './demo/MinFontSize.vue'
import Overflow from './demo/Overflow.vue'
import Resize from './demo/Resize.vue'
</script>
