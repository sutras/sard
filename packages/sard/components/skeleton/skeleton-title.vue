<template>
  <SkeletonBlock :class="bem.e('title')" v-bind="$props" />
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonTitleProps } from './common'

withDefaults(defineProps<SkeletonTitleProps>(), {})

const bem = createBem('skeleton')
</script>
