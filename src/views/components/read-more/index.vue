<template>
  <doc-page title="ReadMore 阅读更多">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="收起时最大高度">
      <MaxHeight />
    </doc-demo>

    <doc-demo title="按钮文案">
      <Text />
    </doc-demo>

    <doc-demo title="隐藏收起按钮">
      <HideClose />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import MaxHeight from './demo/MaxHeight.vue'
import Text from './demo/Text.vue'
import HideClose from './demo/HideClose.vue'
</script>
