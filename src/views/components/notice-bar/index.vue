<template>
  <doc-page title="NoticeBar 公告栏">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="动态数据" full>
      <Dynamic />
    </doc-demo>

    <doc-demo title="强制滚动" full>
      <Scrollable />
    </doc-demo>

    <doc-demo title="强制不滚动" full>
      <UnScrollable />
    </doc-demo>

    <doc-demo title="多行展示" full>
      <Wrap />
    </doc-demo>

    <doc-demo title="自定义左边图标" full>
      <LeftIcon />
    </doc-demo>

    <doc-demo title="可关闭的" full>
      <Closable />
    </doc-demo>

    <doc-demo title="可链接的" full>
      <Linkable />
    </doc-demo>

    <doc-demo title="自定义右边图标" full>
      <RightIcon />
    </doc-demo>

    <doc-demo title="自定义样式" full>
      <Style />
    </doc-demo>

    <doc-demo title="垂直滚动" full>
      <Vertical />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Dynamic from './demo/Dynamic.vue'
import Scrollable from './demo/Scrollable.vue'
import UnScrollable from './demo/UnScrollable.vue'
import Wrap from './demo/Wrap.vue'
import LeftIcon from './demo/LeftIcon.vue'
import Closable from './demo/Closable.vue'
import Linkable from './demo/Linkable.vue'
import RightIcon from './demo/RightIcon.vue'
import Style from './demo/Style.vue'
import Vertical from './demo/Vertical.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-notice-bar {
    margin-bottom: 10px;
  }
}
</style>
