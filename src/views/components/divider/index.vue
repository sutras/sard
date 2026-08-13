<template>
  <doc-page title="Divider 分割线">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="展示文本">
      <Text />
    </doc-demo>

    <doc-demo title="内容位置">
      <Position />
    </doc-demo>

    <doc-demo title="线条类型">
      <Type />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="垂直">
      <Vertical />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Text from './demo/Text.vue'
import Position from './demo/Position.vue'
import Type from './demo/Type.vue'
import Style from './demo/Style.vue'
import Vertical from './demo/Vertical.vue'
</script>
