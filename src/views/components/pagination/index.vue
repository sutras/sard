<template>
  <doc-page title="Pagination 分页">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="显示省略号">
      <Ellipsis />
    </doc-demo>

    <doc-demo title="简单分页">
      <Simple />
    </doc-demo>

    <doc-demo title="自定义">
      <Custom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Ellipsis from './demo/Ellipsis.vue'
import Simple from './demo/Simple.vue'
import Custom from './demo/Custom.vue'
</script>
