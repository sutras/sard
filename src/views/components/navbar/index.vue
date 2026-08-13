<template>
  <doc-page gray title="Navbar 头部导航">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="返回按钮" full>
      <Back />
    </doc-demo>

    <doc-demo title="导航项" full>
      <Item />
    </doc-demo>

    <doc-demo title="流动导航" full>
      <Flow />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <Content />
    </doc-demo>

    <doc-demo title="背景色" full>
      <Background />
    </doc-demo>

    <doc-demo title="文本颜色" full>
      <Color />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Back from './demo/Back.vue'
import Item from './demo/Item.vue'
import Flow from './demo/Flow.vue'
import Content from './demo/Content.vue'
import Background from './demo/Background.vue'
import Color from './demo/Color.vue'
</script>
