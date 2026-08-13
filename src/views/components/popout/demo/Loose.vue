<template>
  <s-list card>
    <s-list-item hover arrow title="默认弹出框" @click="visible1 = true" />
    <s-list-item hover arrow title="显示取消按钮" @click="visible2 = true" />
  </s-list>

  <s-popout v-model:visible="visible1" type="loose" title="标题">
    <div style="padding-inline-start: 16px; padding-inline-end: 16px">
      <div>弹出框内容</div>
      <div>弹出框内容</div>
      <div>弹出框内容</div>
    </div>
  </s-popout>

  <s-popout v-model:visible="visible2" type="loose" show-cancel :show-close="false" title="标题">
    <div style="padding-inline-start: 16px; padding-inline-end: 16px">
      <div>弹出框内容</div>
      <div>弹出框内容</div>
      <div>弹出框内容</div>
    </div>
  </s-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
</script>
