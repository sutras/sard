<template>
  <doc-page title="Input 输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>

    <doc-demo title="可清除的">
      <Clearable />
    </doc-demo>

    <doc-demo title="聚焦时显示清除按钮">
      <ShowClearOnlyFocus />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="插槽">
      <Slot />
    </doc-demo>

    <doc-demo title="去除边框">
      <Borderless />
    </doc-demo>

    <doc-demo title="嵌入的">
      <Inlaid />
    </doc-demo>

    <doc-demo title="多行文本">
      <Multiple />
    </doc-demo>

    <doc-demo title="自动高度">
      <AutoHeight />
    </doc-demo>

    <doc-demo title="字数提示">
      <ShowCount />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Style from './demo/Style.vue'
import Type from './demo/Type.vue'
import Clearable from './demo/Clearable.vue'
import ShowClearOnlyFocus from './demo/ShowClearOnlyFocus.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Slot from './demo/Slot.vue'
import Borderless from './demo/Borderless.vue'
import Inlaid from './demo/Inlaid.vue'
import Multiple from './demo/Multiple.vue'
import AutoHeight from './demo/AutoHeight.vue'
import ShowCount from './demo/ShowCount.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-input ~ .s-input {
    margin-top: 10px;
  }
}
</style>
