<template>
  <SkeletonBlock :class="bem.e('avatar')" :style="skeletonAvatarStyle" v-bind="mergedProps" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem, omit } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonAvatarProps } from './common'

const props = withDefaults(defineProps<SkeletonAvatarProps>(), {})

const bem = createBem('skeleton')

const mergedProps = computed(() => omit(props, ['size']))

const skeletonAvatarStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
  }
})
</script>
