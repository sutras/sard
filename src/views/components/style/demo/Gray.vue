<template>
  <s-flex wrap gap="medium">
    <ColorBox v-for="item in colors" :key="item.token" :name="item.name" :token="item.token" />
  </s-flex>
</template>

<script setup lang="ts">
import ColorBox from './ColorBox.vue'

const colors = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(
  (step) => ({
    name: `gray-${step}`,
    token: `--s-gray-${step}`,
  }),
)
</script>
