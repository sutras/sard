<template>
  <div :class="bem.b()" :style="iconStyle">
    <slot>
      <img v-if="url" :src="url" :class="bem.e('image')" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type ShareSheetIconProps, type ShareSheetIconSlots } from './common'

const props = withDefaults(defineProps<ShareSheetIconProps>(), {})

defineSlots<ShareSheetIconSlots>()

const bem = createBem('share-sheet-icon')

const iconStyle = computed(() => {
  return {
    backgroundColor: props.background,
    color: props.color,
  }
})
</script>
