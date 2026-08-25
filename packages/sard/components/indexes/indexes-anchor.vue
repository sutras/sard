<template>
  <div ref="anchor" :class="bem.e('anchor')">
    <slot>{{ name }}</slot>
  </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, useTemplateRef } from 'vue'
import { createBem, isNullish } from '../../utils'
import { type IndexesAnchorProps, type IndexesAnchorSlots, indexesContextKey } from './common'

const props = withDefaults(defineProps<IndexesAnchorProps>(), {})

defineSlots<IndexesAnchorSlots>()

const bem = createBem('indexes')

const context = inject(indexesContextKey, null)

if (!context) {
  throw new Error('IndexesAnchor must be included in Indexes.')
}

const anchorRef = useTemplateRef('anchor')

const getRect = () => {
  return anchorRef.value!.getBoundingClientRect()
}

onBeforeMount(() => {
  if (!isNullish(props.name)) {
    context.register(props.name, getRect)
  }
})
</script>
