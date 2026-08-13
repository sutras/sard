<template>
  <doc-page title="ProgressBar 条形进度条">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="内部文本">
      <Inside />
    </doc-demo>

    <doc-demo title="隐藏文本">
      <ShowText />
    </doc-demo>

    <doc-demo title="粗细">
      <Thickness />
    </doc-demo>

    <doc-demo title="颜色">
      <Color />
    </doc-demo>

    <doc-demo title="有条纹的">
      <Striped />
    </doc-demo>

    <doc-demo title="状态">
      <Status />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Inside from './demo/Inside.vue'
import ShowText from './demo/ShowText.vue'
import Thickness from './demo/Thickness.vue'
import Color from './demo/Color.vue'
import Striped from './demo/Striped.vue'
import Status from './demo/Status.vue'
</script>
