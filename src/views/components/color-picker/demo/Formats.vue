<template>
  <s-space direction="vertical" size="large">
    <s-list card>
      <s-list-item>
        <s-color-picker v-model="hexColor" format="hex" show-alpha />
      </s-list-item>
      <s-list-item>HEX：{{ hexColor }}</s-list-item>
    </s-list>

    <s-list card>
      <s-list-item>
        <s-color-picker v-model="rgbColor" format="rgb" show-alpha />
      </s-list-item>
      <s-list-item>RGB：{{ rgbColor }}</s-list-item>
    </s-list>

    <s-list card>
      <s-list-item>
        <s-color-picker v-model="hslColor" format="hsl" show-alpha />
      </s-list-item>
      <s-list-item>HSL：{{ hslColor }}</s-list-item>
    </s-list>
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hexColor = ref('#1989FA')
const rgbColor = ref('rgba(25, 137, 250, 0.8)')
const hslColor = ref('hsl(210, 96%, 54%)')
</script>
