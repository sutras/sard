<template>
  <doc-page title="SlideVerify 滑动验证">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="显示目标">
      <ShowTarget />
    </doc-demo>

    <doc-demo title="错误时不重置">
      <ShowError />
    </doc-demo>

    <doc-demo title="自定义主题色">
      <Theme />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import ShowTarget from './demo/ShowTarget.vue'
import ShowError from './demo/ShowError.vue'
import Theme from './demo/Theme.vue'
</script>
