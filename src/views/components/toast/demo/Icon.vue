<template>
  <s-toast v-model:visible="visible" title="自定义图标" #icon>
    <img :src="icon" class="size-8" />
  </s-toast>

  <s-list card>
    <s-list-item hover arrow title="自定义图标" @click="onIconToast" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import icon from '@/assets/logo.svg'

const visible = ref(false)

const onIconToast = () => {
  visible.value = true
}
</script>
