<template>
  <SkeletonBlock
    :class="bem.e('title')"
    :animated="animated"
    :round="round"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonTitleProps } from './common'

withDefaults(defineProps<SkeletonTitleProps>(), {})

const bem = createBem('skeleton')
</script>
