<template>
  <doc-page gray title="Dialog 对话框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="异步关闭">
      <AsyncClose />
    </doc-demo>

    <doc-demo title="圆角按钮">
      <Round />
    </doc-demo>

    <doc-demo title="有头部的">
      <Headed />
    </doc-demo>

    <doc-demo title="自定义内容">
      <Content />
    </doc-demo>

    <doc-demo title="内容中包含弹出框">
      <PopupContent />
    </doc-demo>

    <doc-demo title="自定义按钮属性">
      <ButtonProps />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import AsyncClose from './demo/AsyncClose.vue'
import Round from './demo/Round.vue'
import Headed from './demo/Headed.vue'
import Content from './demo/Content.vue'
import ButtonProps from './demo/ButtonProps.vue'
import PopupContent from './demo/PopupContent.vue'
</script>
