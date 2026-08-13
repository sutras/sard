<template>
  <div :class="bem.b()">
    <StatusBar v-if="statusBar" />
    <div :class="bem.e('content')"></div>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '../status-bar/status-bar.vue'
import { type NavbarPitProps } from './common'
import { createBem } from '../../utils'

withDefaults(defineProps<NavbarPitProps>(), {})

const bem = createBem('navbar-pit')
</script>
