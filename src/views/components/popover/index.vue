<template>
  <doc-page gray title="Popover 气泡弹出框" style="padding-bottom: 100vh">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="受控">
      <Controll />
    </doc-demo>

    <doc-demo title="菜单内容">
      <Menu />
    </doc-demo>

    <doc-demo title="暗黑模式">
      <Dark />
    </doc-demo>

    <doc-demo title="弹出位置">
      <Position />
    </doc-demo>

    <doc-demo title="自定义reference">
      <CustomReference />
    </doc-demo>

    <doc-demo title="手动定义位置">
      <Manual />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Dark from './demo/Dark.vue'
import Controll from './demo/Controll.vue'
import CustomReference from './demo/CustomReference.vue'
import Position from './demo/Position.vue'
import Manual from './demo/Manual.vue'
import Menu from './demo/Menu.vue'
</script>
