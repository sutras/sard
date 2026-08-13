<template>
  <div v-for="item in alignments" :key="item" class="wrapper">
    <s-space :align="item">
      <div>{{ item }}</div>
      <s-button>按钮</s-button>
      <s-avatar />
    </s-space>
  </div>
</template>

<script setup lang="ts">
const alignments = ['start', 'center', 'end', 'baseline'] as const
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid var(--s-color-primary);
  margin-bottom: 10px;
  padding: 10px;
}
</style>
