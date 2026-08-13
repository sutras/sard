<template>
  <doc-page gray title="CascaderInput 级联输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="多选">
      <Multiple />
    </doc-demo>

    <doc-demo title="懒加载">
      <Lazy />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Multiple from './demo/Multiple.vue'
import Lazy from './demo/Lazy.vue'
</script>
