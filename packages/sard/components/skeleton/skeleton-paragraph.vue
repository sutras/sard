<template>
  <div :class="bem.e('paragraph')">
    <SkeletonBlock v-for="i in rows" :key="i" :class="bem.e('row')" v-bind="mergedProps" />
  </div>
</template>

<script setup lang="ts">
import { createBem, omit } from '../../utils'
import SkeletonBlock from './skeleton-block.vue'
import { type SkeletonParagraphProps } from './common'
import { computed } from 'vue'

const props = withDefaults(defineProps<SkeletonParagraphProps>(), {})

const bem = createBem('skeleton')

const mergedProps = computed(() => omit(props, ['rows']))
</script>
