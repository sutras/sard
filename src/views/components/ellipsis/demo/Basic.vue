<template>
  <s-card>
    <s-ellipsis :content="alarmRecord" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
