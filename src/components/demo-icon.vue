<template>
  <span :class="iconClass" :style="iconStyle"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: String,
  size: String,
  color: String,
})

const iconClass = computed(() => {
  return ['demo-icons', `demo-icons-${props.name}`]
})

const iconStyle = computed(() => {
  return {
    fontSize: props.size,
    color: props.color,
  }
})
</script>

<style>
.demo-icons {
  line-height: 1;
}
</style>
