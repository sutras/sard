<template>
  <doc-page title="Rate 评分">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="半星">
      <AllowHalf />
    </doc-demo>

    <doc-demo title="自定义图标">
      <CustomIcon />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="自定义尺寸和间距">
      <Size />
    </doc-demo>

    <doc-demo title="自定义数量">
      <Count />
    </doc-demo>

    <doc-demo title="允许清空">
      <Clearable />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import AllowHalf from './demo/AllowHalf.vue'
import CustomIcon from './demo/CustomIcon.vue'
import Color from './demo/Color.vue'
import Size from './demo/Size.vue'
import Count from './demo/Count.vue'
import Clearable from './demo/Clearable.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-rate {
    margin-bottom: 20px;
  }
}
</style>
