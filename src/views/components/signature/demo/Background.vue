<template>
  <!-- 工业语境：班组长签字确认｜Background 用法演示 -->
  <s-signature background="#eee" @confirm="onConfirm"></s-signature>

  <img v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}
</script>
