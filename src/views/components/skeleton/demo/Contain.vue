<template>
  <s-switch v-model="loading" style="margin-bottom: 10px" />

  <s-skeleton avatar title animated :loading="loading">
    <div style="display: flex; gap: 15px">
      <demo-icon name="person" size="32px" />
      <div style="flex: 1">
        <div style="font-size: var(--s-font-size-lg); margin-bottom: 10px">我是一个标题</div>
        <div>
          我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
        </div>
      </div>
    </div>
  </s-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>
