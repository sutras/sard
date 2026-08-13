<template>
  <doc-page title="Switch 开关">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="不同状态的值">
      <Value />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="加载状态">
      <Loading />
    </doc-demo>

    <doc-demo title="带有文字">
      <Text />
    </doc-demo>

    <doc-demo title="使用插槽自定义内容">
      <Slots />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Size from './demo/Size.vue'
import Color from './demo/Color.vue'
import Value from './demo/Value.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Loading from './demo/Loading.vue'
import Text from './demo/Text.vue'
import Slots from './demo/Slots.vue'
</script>
