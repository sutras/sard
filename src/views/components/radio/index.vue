<template>
  <doc-page gray title="Radio 单选按钮">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="排列方向">
      <Direction />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="图标大小">
      <Size />
    </doc-demo>

    <doc-demo title="图标颜色">
      <Color />
    </doc-demo>

    <doc-demo title="图标类型">
      <Type />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Icon />
    </doc-demo>

    <doc-demo title="自动渲染单选按钮">
      <GroupOptions />
    </doc-demo>

    <doc-demo title="自定义 UI">
      <Custom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Direction from './demo/Direction.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Size from './demo/Size.vue'
import Color from './demo/Color.vue'
import Type from './demo/Type.vue'
import Icon from './demo/Icon.vue'
import GroupOptions from './demo/GroupOptions.vue'
import Custom from './demo/Custom.vue'
</script>
