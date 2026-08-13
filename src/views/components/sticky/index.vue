<template>
  <doc-page title="Sticky 粘性布局" padding-bottom="120vh">
    <doc-demo title="吸顶">
      <OffsetTop />
    </doc-demo>

    <doc-demo title="动态插入">
      <Dynamic />
    </doc-demo>

    <doc-demo title="吸底">
      <OffsetBottom />
    </doc-demo>

    <doc-demo title="吸顶和吸底">
      <OffsetTopBottom />
    </doc-demo>

    <doc-demo title="容器中的吸顶">
      <BoxTop />
    </doc-demo>

    <doc-demo title="容器中的吸底">
      <BoxBottom />
    </doc-demo>

    <doc-demo title="容器中的吸顶和吸底">
      <BoxTopBottom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import OffsetTop from './demo/OffsetTop.vue'
import Dynamic from './demo/Dynamic.vue'
import OffsetBottom from './demo/OffsetBottom.vue'
import OffsetTopBottom from './demo/OffsetTopBottom.vue'
import BoxTop from './demo/BoxTop.vue'
import BoxBottom from './demo/BoxBottom.vue'
import BoxTopBottom from './demo/BoxTopBottom.vue'
</script>
