<template>
  <doc-page title="Button 按钮">
    <doc-demo title="颜色与变体">
      <ColorVariant />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="圆形按钮">
      <Round />
    </doc-demo>

    <doc-demo title="方形按钮">
      <Square />
    </doc-demo>

    <doc-demo title="禁用按钮">
      <Disabled />
    </doc-demo>

    <doc-demo title="按钮尺寸">
      <Size />
    </doc-demo>

    <doc-demo title="加载中">
      <Loading />
    </doc-demo>

    <doc-demo title="块级按钮">
      <Block />
    </doc-demo>

    <doc-demo title="图标按钮">
      <Icon />
    </doc-demo>

    <doc-demo title="幽灵按钮">
      <Ghost />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import ColorVariant from './demo/ColorVariant.vue'
import Color from './demo/Color.vue'
import Round from './demo/Round.vue'
import Square from './demo/Square.vue'
import Disabled from './demo/Disabled.vue'
import Size from './demo/Size.vue'
import Loading from './demo/Loading.vue'
import Block from './demo/Block.vue'
import Icon from './demo/Icon.vue'
import Ghost from './demo/Ghost.vue'
</script>
