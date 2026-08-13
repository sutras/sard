<template>
  <doc-page title="Tag 标签">
    <doc-demo title="基础使用">
      <ColorVariant />
    </doc-demo>

    <doc-demo title="圆角">
      <Round />
    </doc-demo>

    <doc-demo title="标记样式（半圆角）">
      <Mark />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="可关闭的">
      <Closable />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import ColorVariant from './demo/ColorVariant.vue'
import Round from './demo/Round.vue'
import Mark from './demo/Mark.vue'
import Size from './demo/Size.vue'
import Closable from './demo/Closable.vue'
</script>
