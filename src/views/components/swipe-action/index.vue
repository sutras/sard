<template>
  <doc-page gray title="SwipeAction 滑动操作">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="控制显隐">
      <Visible />
    </doc-demo>

    <doc-demo title="禁止滑动">
      <Disabled />
    </doc-demo>

    <doc-demo title="异步关闭">
      <Async />
    </doc-demo>

    <doc-demo title="结合表单使用">
      <Form />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Visible from './demo/Visible.vue'
import Disabled from './demo/Disabled.vue'
import Async from './demo/Async.vue'
import Form from './demo/Form.vue'
</script>
