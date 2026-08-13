<template>
  <s-list card>
    <s-list-item>
      <s-color-picker-input
        v-model="color"
        title="选择颜色"
        placeholder="请选择颜色"
        show-alpha
        show-format
        show-presets
        clearable
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(color) ?? 'undefined'" />
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

const color = ref('rgba(25, 137, 250, 0.8)')
</script>
