<template>
  <doc-page gray title="List 列表">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="可链接的" full>
      <Linkable />
    </doc-demo>

    <doc-demo title="图标" full>
      <Icon />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <Slot />
    </doc-demo>

    <doc-demo title="列表标题和描述" full>
      <Group />
    </doc-demo>

    <doc-demo title="卡片风格">
      <Card />
    </doc-demo>

    <doc-demo title="隐藏边框">
      <HideBorder />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Linkable from './demo/Linkable.vue'
import Icon from './demo/Icon.vue'
import Slot from './demo/Slot.vue'
import Group from './demo/Group.vue'
import Card from './demo/Card.vue'
import HideBorder from './demo/HideBorder.vue'
</script>
