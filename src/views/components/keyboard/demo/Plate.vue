<template>
  <s-segmented v-model="mode" class="mx-8 mb-5" :options="['chinese', 'english']" />
  <s-keyboard v-model:mode="mode" type="plate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type KeyboardPlateMode } from 'sard'

const mode = ref<KeyboardPlateMode>('chinese')
</script>
