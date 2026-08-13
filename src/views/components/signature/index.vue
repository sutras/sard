<template>
  <doc-page gray title="Signature 签名">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="画笔颜色">
      <Color />
    </doc-demo>

    <doc-demo title="画笔粗细">
      <LineWidth />
    </doc-demo>

    <doc-demo title="背景色">
      <Background />
    </doc-demo>

    <doc-demo title="全屏显示">
      <FullScreen />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Color from './demo/Color.vue'
import LineWidth from './demo/LineWidth.vue'
import Background from './demo/Background.vue'
import FullScreen from './demo/FullScreen.vue'
</script>
