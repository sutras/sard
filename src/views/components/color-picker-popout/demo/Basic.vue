<template>
  <s-color-picker-popout
    v-model:visible="visible"
    v-model="color"
    title="选择颜色"
    show-alpha
    show-format
    show-presets
  />

  <s-list card>
    <s-list-item>
      <s-button color="primary" @click="visible = true">打开颜色选择器</s-button>
    </s-list-item>
    <s-list-item>当前颜色：{{ color }}</s-list-item>
    <s-list-item
      title="设置为："
      value="rgb(226, 20, 20)"
      hover
      arrow
      @click="color = 'rgb(226, 20, 20)'"
    />
    <s-list-item title="清空" arrow hover @click="color = ''" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const color = ref('')
</script>
