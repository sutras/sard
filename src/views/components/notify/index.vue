<template>
  <doc-page gray title="Notify 消息通知">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="自定义时长">
      <Duration />
    </doc-demo>

    <doc-demo title="自定义位置">
      <Placement />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import Color from './demo/Color.vue'
import Duration from './demo/Duration.vue'
import Placement from './demo/Placement.vue'
</script>
