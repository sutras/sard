<template>
  <doc-page gray title="Menu 菜单">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="暗黑模式">
      <Dark />
    </doc-demo>

    <doc-demo title="展示图标">
      <Icon />
    </doc-demo>

    <doc-demo title="禁用选项">
      <Disabled />
    </doc-demo>

    <doc-demo title="水平排列">
      <Horizontal />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Dark from './demo/Dark.vue'
import Icon from './demo/Icon.vue'
import Disabled from './demo/Disabled.vue'
import Horizontal from './demo/Horizontal.vue'
</script>
