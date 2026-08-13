<template>
  <doc-page title="CropImage 裁剪图片">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="裁剪比例">
      <CropScale />
    </doc-demo>

    <doc-demo title="修改裁剪尺寸">
      <BeforeCrop />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import CropScale from './demo/CropScale.vue'
import BeforeCrop from './demo/BeforeCrop.vue'
</script>
