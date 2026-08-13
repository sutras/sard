<template>
  <div class="home-indicator">
    <div class="indicator-bar"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{}>()
</script>

<style scoped lang="scss">
.home-indicator {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2147483647;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: var(--s-safe-bottom);
  pointer-events: none;
}

.indicator-bar {
  width: 134px;
  height: 5px;
  margin-bottom: 6px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 2.5px;
}
</style>
