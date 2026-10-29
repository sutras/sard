<template>
  <s-image :src="nameplatePhoto" width="80px" height="80px" shape="circle"></s-image>

  <s-image :src="nameplatePhoto" width="80px" height="80px" radius="6px" class="ms-2"></s-image>
</template>

<script setup lang="ts">
import { nameplatePhoto } from '@/data/industrial-images'
</script>
