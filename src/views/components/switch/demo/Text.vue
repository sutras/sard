<template>
  <s-switch v-model="checked" checked-text="开启" unchecked-text="关闭" />
  <s-switch v-model="checked" checked-text="开启（长文本）" unchecked-text="关闭" class="ms-2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
