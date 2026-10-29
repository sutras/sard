<template>
  <video ref="video" :src="url" :poster="poster" class="w-full h-full bg-black" controls></video>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

const props = defineProps<{
  url: string
  poster: string
  active: boolean
}>()

const videoRef = useTemplateRef('video')

watch(
  () => props.active,
  (active) => {
    if (active) {
      videoRef.value?.play()
    } else {
      videoRef.value?.pause()
    }
  },
)
</script>
