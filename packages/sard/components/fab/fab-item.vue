<template>
  <div :class="fabItemClass" @click="onClick">
    <div v-if="!isVisibleEmpty(name) && !context.hideName" :class="bem.e('name')">
      <slot name="name">
        {{ name }}
      </slot>
    </div>
    <div :class="bem.e('btn')" :style="{ background: background, color: color }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem, isVisibleEmpty } from '../../utils'
import {
  type FabItemProps,
  type FabItemSlots,
  type FabItemEmits,
  type FabItemExpose,
  defaultFabItemProps,
  fabContextKey,
} from './common'

const props = withDefaults(defineProps<FabItemProps>(), defaultFabItemProps)

defineSlots<FabItemSlots>()

const emit = defineEmits<FabItemEmits>()

const bem = createBem('fab-item')

const context = inject(fabContextKey)!

const onClick = (event: MouseEvent) => {
  if (!props.isEntry) {
    context.onItemClick()
  }
  emit('click', event)
}

// ============================ style ============================

const fabItemClass = computed(() => {
  return [bem.b(), bem.m('left', context.isLeft), bem.m('entry', props.isEntry)]
})

defineExpose<FabItemExpose>({})
</script>
