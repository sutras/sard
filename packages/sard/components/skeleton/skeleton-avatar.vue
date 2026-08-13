<template>
  <SkeletonBlock
    :class="bem.e('avatar')"
    :style="skeletonAvatarStyle"
    :animated="animated"
    :round="round"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonAvatarProps } from './common'

const props = withDefaults(defineProps<SkeletonAvatarProps>(), {})

const bem = createBem('skeleton')

const skeletonAvatarStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
  }
})
</script>
