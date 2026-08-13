<template>
  <s-signature :line-width="5" @confirm="onConfirm"></s-signature>

  <img v-if="dataURL" style="width: 100%" :src="dataURL" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataURL = ref('')

const onConfirm = (url: string) => {
  dataURL.value = url
}
</script>
