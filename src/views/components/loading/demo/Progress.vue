<template>
  <div class="text-2xl">
    <s-loading :animated="false" :progress="progress" type="circular" />
    <s-loading :animated="false" :progress="progress" type="clock" />
    <s-loading :animated="false">
      <template #circular>
        <demo-icon
          name="arrow-clockwise"
          :style="{
            transform: `rotate(${progress * 360}deg)`,
          }"
        />
      </template>
    </s-loading>
  </div>

  <s-slider v-model="progress" :min="0" :max="1" :step="0.01" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(0.5)
</script>
