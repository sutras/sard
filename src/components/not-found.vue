<template>
  <div class="pt-[30vh]">
    <s-result status="error" title="404">
      <s-button @click="router.push('/')">返回首页</s-button>
    </s-result>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
</script>
