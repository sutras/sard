<template>
  <doc-page title="Segmented 分段控制器">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="胶囊形状">
      <Shape />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Custom />
    </doc-demo>

    <doc-demo title="图标排列">
      <Icon />
    </doc-demo>

    <doc-demo title="只设置图标">
      <OnlyIcon />
    </doc-demo>

    <doc-demo title="垂直方向">
      <Direction />
    </doc-demo>

    <doc-demo title="禁用">
      <Disabled />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Size from './demo/Size.vue'
import Shape from './demo/Shape.vue'
import Icon from './demo/Icon.vue'
import OnlyIcon from './demo/OnlyIcon.vue'
import Direction from './demo/Direction.vue'
import Disabled from './demo/Disabled.vue'
import Custom from './demo/Custom.vue'
</script>
