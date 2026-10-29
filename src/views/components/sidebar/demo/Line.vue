<template>
  <s-sidebar v-model="value" line>
    <s-sidebar-item value="1" label="标签名称" />
    <s-sidebar-item value="2" label="标签名称" />
    <s-sidebar-item value="3" label="标签名称" />
  </s-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
