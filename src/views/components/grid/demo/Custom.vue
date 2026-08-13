<template>
  <s-grid>
    <s-grid-item v-for="i in 4" :key="i">
      <template #content>
        <div class="grid-box">{{ i }}</div>
      </template>
    </s-grid-item>
  </s-grid>

  <s-grid :columns="3" square :gap="8" class="mt-4">
    <s-grid-item v-for="url in urls" :key="url">
      <s-image :src="url" width="100%" height="100%" radius="8px" class="flex!" />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
const urls = [
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat2.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat3.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat4.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat5.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat6.jpg',
]
</script>

<style lang="scss" scoped>
.grid-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  font-size: 24px;
  background-color: var(--s-fill-color-secondary);
  border-radius: 50%;
}
</style>
