<template>
  <doc-page title="Watermark 水印">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="多行水印">
      <MultiLine />
    </doc-demo>

    <doc-demo title="图片水印">
      <Image />
    </doc-demo>

    <doc-demo title="自定义绘制">
      <s-list>
        <s-list-item title="自定义绘制" arrow hover @click="navigateTo('Custom')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Basic from './demo/Basic.vue'
import MultiLine from './demo/MultiLine.vue'
import Image from './demo/Image.vue'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/watermark/demo/${url}`)
}
</script>
