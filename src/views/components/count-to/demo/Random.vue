<template>
  <s-button @click="onClick">滚动到 {{ number }}</s-button>

  <s-count-to class="font-mono ms-2" :value="number" />
</template>

<script setup lang="ts">
import { random } from 'sard'
import { ref } from 'vue'

const number = ref(random(100, 5000))

const onClick = () => {
  number.value = random(100, 5000)
}
</script>
