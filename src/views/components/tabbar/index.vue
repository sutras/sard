<template>
  <doc-page gray title="Tabbar 标签栏">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="自定义图标" full>
      <Icon />
    </doc-demo>

    <doc-demo title="自定义颜色" full>
      <Color />
    </doc-demo>

    <doc-demo title="徽标" full>
      <Badge />
    </doc-demo>

    <doc-demo title="中间鼓起" full>
      <Bulge />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Icon from './demo/Icon.vue'
import Color from './demo/Color.vue'
import Badge from './demo/Badge.vue'
import Bulge from './demo/Bulge.vue'
</script>
