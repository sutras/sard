<template>
  <doc-page title="Swiper 轮播图">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="纵向滚动">
      <Vertical />
    </doc-demo>

    <doc-demo title="循环滑动">
      <Loop />
    </doc-demo>

    <doc-demo title="自动播放">
      <AutoPlay />
    </doc-demo>

    <doc-demo title="自定义指示器">
      <DotType />
    </doc-demo>

    <doc-demo title="展示标题">
      <Title />
    </doc-demo>

    <doc-demo title="嵌入视频">
      <Video />
    </doc-demo>

    <doc-demo title="多项展示">
      <MultipleItems />
    </doc-demo>

    <doc-demo title="组切换">
      <Group />
    </doc-demo>

    <doc-demo title="缩放效果">
      <Scale />
    </doc-demo>

    <doc-demo title="多项居中">
      <MultipleCenter />
    </doc-demo>

    <doc-demo title="自动高度">
      <AutoHeight />
    </doc-demo>

    <doc-demo title="嵌套轮播">
      <Nested />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import AutoPlay from './demo/AutoPlay.vue'
import Loop from './demo/Loop.vue'
import Vertical from './demo/Vertical.vue'
import DotType from './demo/DotType.vue'
import Title from './demo/Title.vue'
import Video from './demo/Video.vue'
import MultipleItems from './demo/MultipleItems.vue'
import Scale from './demo/Scale.vue'
import AutoHeight from './demo/AutoHeight.vue'
import Nested from './demo/Nested.vue'
import Group from './demo/Group.vue'
import MultipleCenter from './demo/MultipleCenter.vue'
</script>
