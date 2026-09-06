<template>
  <doc-page title="Flex 弹性布局">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
    <doc-demo title="垂直布局">
      <Vertical />
    </doc-demo>
    <doc-demo title="间距大小">
      <Gap />
    </doc-demo>
    <doc-demo title="自定义间距大小">
      <CustomGap />
    </doc-demo>
    <doc-demo title="自动换行">
      <Wrap />
    </doc-demo>
    <doc-demo title="对齐">
      <Align />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Vertical from './demo/Vertical.vue'
import Gap from './demo/Gap.vue'
import CustomGap from './demo/CustomGap.vue'
import Wrap from './demo/Wrap.vue'
import Align from './demo/Align.vue'
</script>
