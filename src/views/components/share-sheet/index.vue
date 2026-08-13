<template>
  <doc-page title="ShareSheet 分享面板">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="取消按钮">
      <Cancel />
    </doc-demo>

    <doc-demo title="多行">
      <MultipleRow />
    </doc-demo>

    <doc-demo title="标题和描述">
      <TitleDescription />
    </doc-demo>

    <doc-demo title="图片类型图标">
      <Picture />
    </doc-demo>

    <doc-demo title="禁用">
      <Disabled />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Cancel from './demo/Cancel.vue'
import MultipleRow from './demo/MultipleRow.vue'
import TitleDescription from './demo/TitleDescription.vue'
import Picture from './demo/Picture.vue'
import Disabled from './demo/Disabled.vue'
</script>
