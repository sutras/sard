<template>
  <VirtualStatusBar v-if="!isMobileDevices()" />
  <RouterView />
  <HomeIndicator v-if="!isMobileDevices()" />
</template>

<script setup lang="ts">
import VirtualStatusBar from '@/components/virtual-status-bar.vue'
import { isMobileDevices } from './utils'
import HomeIndicator from '@/components/home-indicator.vue'
</script>
