<template>
  <doc-page title="Style 样式">
    <doc-demo title="基础颜色">
      <Basic />
    </doc-demo>

    <doc-demo title="灰度色">
      <Gray />
    </doc-demo>

    <doc-demo title="主题色">
      <Theme />
    </doc-demo>

    <doc-demo title="中性色">
      <Neutral />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Gray from './demo/Gray.vue'
import Theme from './demo/Theme.vue'
import Neutral from './demo/Neutral.vue'
</script>
