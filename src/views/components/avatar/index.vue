<template>
  <doc-page title="Avatar 头像">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="形状">
      <Shape />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="图片类型">
      <Picture />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Children />
    </doc-demo>

    <doc-demo title="额外内容">
      <Extra />
    </doc-demo>

    <doc-demo title="头像组">
      <Group />
    </doc-demo>

    <doc-demo title="实际头像数不超过最大数">
      <GroupLess />
    </doc-demo>

    <doc-demo title="覆盖面">
      <GroupCoverage />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Shape from './demo/Shape.vue'
import Size from './demo/Size.vue'
import Style from './demo/Style.vue'
import Picture from './demo/Picture.vue'
import Children from './demo/Children.vue'
import Extra from './demo/Extra.vue'
import Group from './demo/Group.vue'
import GroupLess from './demo/GroupLess.vue'
import GroupCoverage from './demo/GroupCoverage.vue'
</script>
