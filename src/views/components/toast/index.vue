<template>
  <doc-page gray title="Toast 轻提示">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义位置">
      <Placement />
    </doc-demo>

    <doc-demo title="加载中的背景">
      <Mask />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Icon />
    </doc-demo>

    <doc-demo title="创建独立的提示">
      <Create />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Placement from './demo/Placement.vue'
import Mask from './demo/Mask.vue'
import Icon from './demo/Icon.vue'
import Create from './demo/Create.vue'
</script>
