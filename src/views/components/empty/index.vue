<template>
  <doc-page title="Empty 空状态">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义描述信息">
      <Description />
    </doc-demo>

    <doc-demo title="自定义图标大小">
      <Size />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Icon />
    </doc-demo>

    <doc-demo title="额外内容">
      <Extra />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Description from './demo/Description.vue'
import Size from './demo/Size.vue'
import Icon from './demo/Icon.vue'
import Extra from './demo/Extra.vue'
</script>
