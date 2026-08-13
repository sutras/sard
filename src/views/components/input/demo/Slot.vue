<template>
  <s-input v-model="value" placeholder="请输入">
    <template #prepend>
      <demo-icon name="search" />
    </template>
  </s-input>
  <s-input v-model="value" placeholder="请输入" clearable>
    <template #append>
      <s-button variant="link" size="small" compact>发送验证码</s-button>
    </template>
  </s-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
