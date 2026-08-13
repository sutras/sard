<template>
  <doc-page gray title="Picker 选择器">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="对象类型">
      <ObjectOption />
    </doc-demo>

    <doc-demo title="多列">
      <Multiple />
    </doc-demo>

    <doc-demo title="对象类型多列">
      <ObjectMultiple />
    </doc-demo>

    <doc-demo title="级联选择">
      <Cascaded />
    </doc-demo>

    <doc-demo title="插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import ObjectOption from './demo/ObjectOption.vue'
import Multiple from './demo/Multiple.vue'
import ObjectMultiple from './demo/ObjectMultiple.vue'
import Cascaded from './demo/Cascaded.vue'
import Slot from './demo/Slot.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-button {
    margin-top: 10px;
  }
}
</style>
