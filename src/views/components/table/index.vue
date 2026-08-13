<template>
  <doc-page title="Table 表格">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
    <doc-demo title="隐藏表头">
      <HideHeader />
    </doc-demo>
    <doc-demo title="下边框">
      <Underline />
    </doc-demo>
    <doc-demo title="边框">
      <Border />
    </doc-demo>
    <doc-demo title="有条纹的">
      <Striped />
    </doc-demo>
    <doc-demo title="自定义宽度">
      <Width />
    </doc-demo>
    <doc-demo title="固定表头">
      <FixedHeader />
    </doc-demo>
    <doc-demo title="固定列">
      <FixedColumn />
    </doc-demo>
    <doc-demo title="固定表头和列">
      <Fixed />
    </doc-demo>
    <doc-demo title="多级表头">
      <MultilevelHeader />
    </doc-demo>
    <doc-demo title="合并行或列">
      <Merge />
    </doc-demo>
    <doc-demo title="满屏表格">
      <FullScreenEntry />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import HideHeader from './demo/HideHeader.vue'
import Border from './demo/Border.vue'
import Underline from './demo/Underline.vue'
import Striped from './demo/Striped.vue'
import Width from './demo/Width.vue'
import FixedHeader from './demo/FixedHeader.vue'
import FixedColumn from './demo/FixedColumn.vue'
import Fixed from './demo/Fixed.vue'
import FullScreenEntry from './demo/FullScreenEntry.vue'
import MultilevelHeader from './demo/MultilevelHeader.vue'
import Merge from './demo/Merge.vue'
</script>
