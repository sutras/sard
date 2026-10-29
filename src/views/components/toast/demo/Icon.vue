<template>
  <s-toast v-model:visible="visible" title="3 条未确认报警" #icon>
    <demo-icon name="bell" size="32px" color="var(--s-color-danger)" />
  </s-toast>

  <s-list card>
    <s-list-item hover arrow title="自定义图标" @click="onIconToast" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const onIconToast = () => {
  visible.value = true
}
</script>
