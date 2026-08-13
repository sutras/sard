<template>
  <doc-page title="Grid 宫格">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义列数">
      <Columns />
    </doc-demo>

    <doc-demo title="正方形格子">
      <Square />
    </doc-demo>

    <doc-demo title="格子间距">
      <Gap />
    </doc-demo>

    <doc-demo title="显示边框">
      <Border />
    </doc-demo>

    <doc-demo title="内容横排">
      <Horizontal />
    </doc-demo>

    <doc-demo title="内容翻转">
      <Reverse />
    </doc-demo>

    <doc-demo title="可点击的">
      <Clickable />
    </doc-demo>

    <doc-demo title="徽标提示">
      <Badge />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Custom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Border from './demo/Border.vue'
import Columns from './demo/Columns.vue'
import Square from './demo/Square.vue'
import Gap from './demo/Gap.vue'
import Horizontal from './demo/Horizontal.vue'
import Reverse from './demo/Reverse.vue'
import Clickable from './demo/Clickable.vue'
import Badge from './demo/Badge.vue'
import Custom from './demo/Custom.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-grid {
    margin-bottom: 20px;
  }
}
</style>
