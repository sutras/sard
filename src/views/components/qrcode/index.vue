<template>
  <doc-page gray title="Qrcode 二维码">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="呈现的大小">
      <DisplaySize />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="添加图标">
      <Icon />
    </doc-demo>

    <doc-demo title="安静区域模块数">
      <QuietZoneModules />
    </doc-demo>

    <doc-demo title="错误纠错级别">
      <ECL />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import DisplaySize from './demo/DisplaySize.vue'
import Color from './demo/Color.vue'
import Icon from './demo/Icon.vue'
import QuietZoneModules from './demo/QuietZoneModules.vue'
import ECL from './demo/ECL.vue'
</script>
