<template>
  <doc-page gray title="Barcode 条形码">
    <doc-demo title="基础用法">
      <Basic />
    </doc-demo>

    <doc-demo title="条形码类型">
      <Format />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="文本">
      <Text />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Format from './demo/Format.vue'
import Style from './demo/Style.vue'
import Text from './demo/Text.vue'
</script>
