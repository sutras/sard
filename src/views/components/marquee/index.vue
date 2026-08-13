<template>
  <doc-page title="Marquee 跑马灯">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="水平方向">
      <Horizontal />
    </doc-demo>

    <doc-demo title="动态数据">
      <Dynamic />
    </doc-demo>

    <doc-demo title="国家滚动">
      <Countries />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Horizontal from './demo/Horizontal.vue'
import Dynamic from './demo/Dynamic.vue'
import Countries from './demo/Countries.vue'
</script>
