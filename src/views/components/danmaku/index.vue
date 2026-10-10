<template>
  <doc-page title="Danmaku 弹幕">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Custom />
    </doc-demo>

    <doc-demo title="动态发送与播放控制">
      <Interact />
    </doc-demo>

    <doc-demo title="RTL 方向">
      <Rtl />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Custom from './demo/Custom.vue'
import Interact from './demo/Interact.vue'
import Rtl from './demo/Rtl.vue'
</script>
