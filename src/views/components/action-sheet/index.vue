<template>
  <doc-page title="ActionSheet 动作面板">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="取消按钮">
      <Cancel />
    </doc-demo>

    <doc-demo title="描述信息">
      <Description />
    </doc-demo>

    <doc-demo title="动作状态">
      <Status />
    </doc-demo>

    <doc-demo title="命令式">
      <Imperative />
    </doc-demo>

    <doc-demo title="插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Cancel from './demo/Cancel.vue'
import Description from './demo/Description.vue'
import Status from './demo/Status.vue'
import Imperative from './demo/Imperative.vue'
import Slot from './demo/Slot.vue'
</script>
