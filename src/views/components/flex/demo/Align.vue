<template>
  <s-segmented v-model="value" :options="alignments" />
  <div class="wrapper">
    <s-flex :align="value" gap="medium">
      <div class="box"></div>
      <s-button>{{ value }}</s-button>
    </s-flex>
  </div>
</template>

<script setup lang="ts">
import type { FlexAlign } from 'sard/components/flex/common'
import { ref } from 'vue'

const alignments = ['start', 'center', 'end', 'baseline']

const value = ref<FlexAlign>('start')
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 10px;
  padding: 10px;
  background: var(--s-fill-color-fourth);
}
.box {
  width: 100px;
  height: 100px;
  background: var(--s-fill-color);
}
</style>
