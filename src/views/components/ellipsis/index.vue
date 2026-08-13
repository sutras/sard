<template>
  <doc-page gray title="Ellipsis 文本省略">
    <doc-demo title="基础用法">
      <Basic />
    </doc-demo>

    <doc-demo title="展开/收起">
      <Expand />
    </doc-demo>

    <doc-demo title="自定义展示行数">
      <Rows />
    </doc-demo>

    <doc-demo title="自定义省略符号">
      <Dots />
    </doc-demo>

    <doc-demo title="自定义省略位置">
      <Position />
    </doc-demo>

    <doc-demo title="动态切换">
      <Dynamic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Dots from './demo/Dots.vue'
import Expand from './demo/Expand.vue'
import Position from './demo/Position.vue'
import Rows from './demo/Rows.vue'
import Dynamic from './demo/Dynamic.vue'
</script>
