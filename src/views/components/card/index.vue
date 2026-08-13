<template>
  <doc-page gray title="Card 卡片">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="只有主体">
      <OnlyBody />
    </doc-demo>

    <doc-demo title="底部">
      <Footer />
    </doc-demo>

    <doc-demo title="可点击的">
      <Hover />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="折叠">
      <Collapsed />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import OnlyBody from './demo/OnlyBody.vue'
import Footer from './demo/Footer.vue'
import Hover from './demo/Hover.vue'
import Style from './demo/Style.vue'
import Collapsed from './demo/Collapsed.vue'
</script>
