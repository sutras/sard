<template>
  <s-tabs v-model="value" style="--s-tabs-line-bg: transparent">
    <s-tab :value="1">
      <demo-icon name="star" />
      <div class="ms-1">标签1</div>
    </s-tab>
    <s-tab :value="2">
      <div>标签2</div>
      <s-badge value="5" />
    </s-tab>
    <s-tab :value="3" label="标签3"></s-tab>

    <template #line>
      <demo-icon name="smile-line" color="var(--s-color-danger)" size="20px" />
    </template>
  </s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
