<template>
  <div v-if="loading" :class="bem.b()">
    <SkeletonAvatar v-if="avatar" :animated="animated" :size="avatarSize" :round="avatarRound" />

    <div :class="bem.e('content')">
      <SkeletonTitle v-if="title" :animated="animated" :round="round" />
      <SkeletonParagraph :rows="rows" :animated="animated" :round="round" />
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import SkeletonAvatar from './skeleton-avatar.vue'
import SkeletonTitle from './skeleton-title.vue'
import SkeletonParagraph from './skeleton-paragraph.vue'
import { type SkeletonProps, type SkeletonSlots, defaultSkeletonProps } from './common'

withDefaults(defineProps<SkeletonProps>(), defaultSkeletonProps)

defineSlots<SkeletonSlots>()

const bem = createBem('skeleton')
</script>
