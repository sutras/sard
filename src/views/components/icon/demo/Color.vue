<template>
  <s-flex align="center" gap="large">
    <WarningFill class="text-3xl text-red-600" data-state="ALARM" />
    <CheckCircleFill class="text-3xl text-green-600" data-state="RUN" />
    <InfoCircleFill class="text-3xl text-amber-500" data-state="WARNING" />
  </s-flex>
</template>

<script setup lang="ts">
import { CheckCircleFill, InfoCircleFill, WarningFill } from '@sard/icons'
</script>
