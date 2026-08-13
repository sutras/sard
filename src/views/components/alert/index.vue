<template>
  <doc-page title="Alert 警告提示">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
    <doc-demo title="类型">
      <Type />
    </doc-demo>
    <doc-demo title="显示图标">
      <ShowIcon />
    </doc-demo>
    <doc-demo title="可关闭的">
      <Closable />
    </doc-demo>
    <doc-demo title="方形警告框">
      <Square />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import ShowIcon from './demo/ShowIcon.vue'
import Closable from './demo/Closable.vue'
import Square from './demo/Square.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-alert {
    margin-bottom: 10px;
  }
}
</style>
