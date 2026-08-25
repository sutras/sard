<template>
  <div ref="anchor">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, useTemplateRef } from 'vue'
import { type ScrollSpyAnchorProps, type ScrollSpyAnchorSlots, scrollSpyContextKey } from './common'

const props = withDefaults(defineProps<ScrollSpyAnchorProps>(), {})

defineSlots<ScrollSpyAnchorSlots>()

const context = inject(scrollSpyContextKey, null)

if (!context) {
  throw new Error('ScrollSpyAnchor must be included in ScrollSpy.')
}

const anchorRef = useTemplateRef('anchor')

const getRect = () => {
  return anchorRef.value!.getBoundingClientRect()
}

onBeforeMount(() => {
  context.register(props.name, getRect)
})
</script>
