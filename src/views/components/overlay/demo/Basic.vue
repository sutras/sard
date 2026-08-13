<template>
  <s-overlay :visible="visible" :z-index="zIndex" @click="visible = false"></s-overlay>

  <s-button @click="onClick">显示遮罩</s-button>
</template>

<script setup lang="ts">
import { useZIndex } from 'sard'
import { ref } from 'vue'

const visible = ref(false)

const [zIndex, increaseZIndex] = useZIndex()

const onClick = () => {
  increaseZIndex()
  visible.value = true
}
</script>
