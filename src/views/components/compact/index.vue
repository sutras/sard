<template>
  <doc-page title="Compact 紧凑布局">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="块级元素">
      <Block />
    </doc-demo>

    <doc-demo title="垂直排列">
      <Vertical />
    </doc-demo>

    <doc-demo title="垂直排列块级元素">
      <VerticalBlock />
    </doc-demo>

    <doc-demo title="输入类组件">
      <Input />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Block from './demo/Block.vue'
import Vertical from './demo/Vertical.vue'
import VerticalBlock from './demo/VerticalBlock.vue'
import Input from './demo/Input.vue'
</script>
