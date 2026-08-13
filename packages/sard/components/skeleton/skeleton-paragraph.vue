<template>
  <div :class="bem.e('paragraph')">
    <SkeletonBlock
      v-for="i in rows"
      :key="i"
      :animated="animated"
      :round="round"
      :width="width"
      :height="height"
      :class="bem.e('row')"
    />
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonParagraphProps } from './common'

withDefaults(defineProps<SkeletonParagraphProps>(), {})

const bem = createBem('skeleton')
</script>
