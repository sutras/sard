<template>
  <s-list>
    <s-list-item>
      <s-input v-model="username" inlaid clearable placeholder="请输入用户名" />
    </s-list-item>
    <s-list-item>
      <s-input v-model="password" inlaid clearable type="password" placeholder="请输入密码" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>
