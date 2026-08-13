<template>
  <s-grid :columns="2">
    <s-grid-item text="文字" #icon>
      <s-badge dot>
        <Image />
      </s-badge>
    </s-grid-item>
    <s-grid-item text="文字" #icon>
      <s-badge :value="999">
        <Image />
      </s-badge>
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
</script>
