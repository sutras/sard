<template>
  <doc-page title="Result 结果">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="额外内容">
      <Extra />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Icon />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Extra from './demo/Extra.vue'
import Icon from './demo/Icon.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-result {
    margin-bottom: 30px;
  }
}
</style>
