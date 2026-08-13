<template>
  <doc-page title="ScrollList 横向滚动列表">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="滚动条颜色">
      <Color />
    </doc-demo>

    <doc-demo title="动态数据">
      <Dynamic />
    </doc-demo>

    <doc-demo title="隐藏滚动条">
      <HideThumb />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Color from './demo/Color.vue'
import Dynamic from './demo/Dynamic.vue'
import HideThumb from './demo/HideThumb.vue'
</script>
