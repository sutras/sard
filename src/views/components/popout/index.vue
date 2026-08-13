<template>
  <doc-page gray title="Popout 弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="宽松类型">
      <Loose />
    </doc-demo>

    <doc-demo title="异步关闭">
      <BeforeClose />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Loose from './demo/Loose.vue'
import BeforeClose from './demo/BeforeClose.vue'
</script>
