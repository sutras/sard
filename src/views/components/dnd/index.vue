<template>
  <doc-page gray title="Dnd 拖放">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="表单列表" full>
      <FormList />
    </doc-demo>

    <doc-demo title="嵌套拖拽">
      <Nested />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import FormList from './demo/FormList.vue'
import Nested from './demo/Nested.vue'
</script>
