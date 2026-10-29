<template>
  <div class="color-box">
    <div class="color-box__chip" :style="{ background: `var(${token})` }"></div>
    <div class="color-box__name">{{ name }}</div>
    <div class="color-box__token">{{ token }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  token: string
}>()
</script>

<style lang="scss" scoped>
.color-box {
  width: 104px;
  font-size: var(--s-font-size-sm);
}

.color-box__chip {
  height: 44px;
  border-radius: 6px;
  border: 1px solid var(--s-border-color);
}

.color-box__name {
  margin-top: 4px;
}

.color-box__token {
  color: var(--s-text-color-tertiary);
  font-size: 10px;
  word-break: break-all;
}
</style>
