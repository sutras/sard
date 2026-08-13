<template>
  <doc-page gray title="SelectInput 列表选择输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义整个选项">
      <Custom />
    </doc-demo>

    <doc-demo title="多选">
      <Multiple />
    </doc-demo>

    <doc-demo title="远程">
      <Remote />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Custom from './demo/CustomOption.vue'
import Multiple from './demo/Multiple.vue'
import Remote from './demo/Remote.vue'
</script>
