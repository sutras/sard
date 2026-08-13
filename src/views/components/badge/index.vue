<template>
  <doc-page title="Badge 徽标">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="最大值">
      <Max />
    </doc-demo>

    <doc-demo title="值为0时不隐藏">
      <ShowZero />
    </doc-demo>

    <doc-demo title="圆点显示">
      <Dot />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="独立展示">
      <OnlyBadge />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Custom />
    </doc-demo>

    <doc-demo title="不包裹组件">
      <UnWrap />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Max from './demo/Max.vue'
import ShowZero from './demo/ShowZero.vue'
import Dot from './demo/Dot.vue'
import Color from './demo/Color.vue'
import OnlyBadge from './demo/OnlyBadge.vue'
import Custom from './demo/Custom.vue'
import UnWrap from './demo/UnWrap.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-badge__wrapper {
    margin-inline-end: 10px;
  }
}
</style>
