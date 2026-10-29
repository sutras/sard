<template>
  <doc-title>只读</doc-title>
  <s-upload
    :model-value="[
      {
        url: inspectionPhoto,
      },
    ]"
    readonly
  />

  <doc-title>禁用</doc-title>
  <s-upload
    :model-value="[
      {
        url: inspectionPhoto,
      },
    ]"
    disabled
  />
</template>

<script setup lang="ts">
import { inspectionPhoto } from '@/data/industrial-images'
</script>
