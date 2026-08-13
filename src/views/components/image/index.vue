<template>
  <doc-page title="Image 图片">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="图片模式">
      <Mode />
    </doc-demo>

    <doc-demo title="图片形状">
      <Shape />
    </doc-demo>

    <doc-demo title="懒加载">
      <LazyLoad />
    </doc-demo>

    <doc-demo title="加载中提示">
      <Loading />
    </doc-demo>

    <doc-demo title="加载错误提示">
      <Error />
    </doc-demo>

    <doc-demo title="淡入动画">
      <Fade />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Mode from './demo/Mode.vue'
import Shape from './demo/Shape.vue'
import LazyLoad from './demo/LazyLoad.vue'
import Loading from './demo/Loading.vue'
import Error from './demo/Error.vue'
import Fade from './demo/Fade.vue'
</script>
