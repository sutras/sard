<template>
  <s-grid :columns="2" :gap="10" bordered>
    <s-grid-item v-for="mode in modes" :key="mode">
      <template #content>
        <div class="image-title">{{ mode }}</div>
        <s-image
          class="image"
          src="https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger5.jpg"
          width="120px"
          height="120px"
          :mode="mode"
        ></s-image>
      </template>
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { type ImageProps } from 'sard'

const modes: ImageProps['mode'][] = [
  'aspectFit',
  'aspectFill',
  'scaleToFill',
  'widthFix',
  'heightFix',
  'top',
  'bottom',
  'left',
  'right',
  'center',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
]
</script>

<style lang="scss" scoped>
.image-title {
  font-size: var(--s-font-size-sm);
  margin-bottom: 4px;
}
.image {
  border: 1px solid var(--s-border-color);
}
</style>
