<template>
  <s-list>
    <s-list-item>
      <s-input v-model="username" inlaid clearable placeholder="操作员工号 例 A-1042" />
    </s-list-item>
    <s-list-item>
      <s-input
        v-model="password"
        inlaid
        clearable
        type="password"
        placeholder="班组长授权码（6 位）"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>
