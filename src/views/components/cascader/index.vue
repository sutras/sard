<template>
  <doc-page gray title="Cascader 级联选择">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="选择即改变">
      <ChangeOnSelect />
    </doc-demo>

    <doc-demo title="懒加载">
      <Lazy />
    </doc-demo>

    <doc-demo title="自定义面板上方内容">
      <OptionTop />
    </doc-demo>

    <doc-demo title="禁选选项">
      <Disabled />
    </doc-demo>

    <doc-demo title="绑定所有级别的值">
      <AllLevels />
    </doc-demo>

    <doc-demo title="多选">
      <Multiple />
    </doc-demo>

    <doc-demo title="多选-绑定所有级别的值">
      <MultipleAllLevels />
    </doc-demo>

    <doc-demo title="多选-选择任意级别">
      <CheckStrictly />
    </doc-demo>

    <doc-demo title="多选-选择任意级别-绑定所有级别">
      <CheckStrictlyAllLevels />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import ChangeOnSelect from './demo/ChangeOnSelect.vue'
import Lazy from './demo/Lazy.vue'
import OptionTop from './demo/OptionTop.vue'
import Disabled from './demo/Disabled.vue'
import AllLevels from './demo/AllLevels.vue'
import Multiple from './demo/Multiple.vue'
import MultipleAllLevels from './demo/MultipleAllLevels.vue'
import CheckStrictly from './demo/CheckStrictly.vue'
import CheckStrictlyAllLevels from './demo/CheckStrictlyAllLevels.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-button {
    margin-top: 10px;
  }
}
</style>
