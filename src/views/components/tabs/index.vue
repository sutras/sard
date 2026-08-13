<template>
  <doc-page title="Tabs 标签页">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="可滚动标签栏">
      <Scrollable />
    </doc-demo>

    <doc-demo title="禁用标签">
      <Disabled />
    </doc-demo>

    <doc-demo title="药丸类型">
      <Pill />
    </doc-demo>

    <doc-demo title="卡片类型">
      <Card />
    </doc-demo>

    <doc-demo title="自定义标签">
      <CustomTab />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Scrollable from './demo/Scrollable.vue'
import Disabled from './demo/Disabled.vue'
import Pill from './demo/Pill.vue'
import Card from './demo/Card.vue'
import CustomTab from './demo/CustomTab.vue'
</script>
