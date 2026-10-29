<template>
  <s-button @click="visible = true">签名</s-button>

  <s-signature v-model:visible="visible" full-screen @confirm="onConfirm">
    <div class="text-(--s-text-color-tertiary)">请在上面空白处手写您的签名</div>
  </s-signature>

  <img v-if="dataURL" style="width: 100%" mode="widthFix" :src="dataURL" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}

const visible = ref(false)
</script>
