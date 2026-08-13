<template>
  <slot v-if="disalbed"></slot>
  <Transition
    v-else
    :type="type"
    :name="mergedName"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
import { computed, Transition } from 'vue'
import { createBem } from '../../utils'
import {
  defaultMotionProps,
  type MotionEmits,
  type MotionHookName,
  type MotionProps,
  type MotionSlots,
} from './common'

const props = withDefaults(defineProps<MotionProps>(), defaultMotionProps)

defineSlots<MotionSlots>()

const emit = defineEmits<MotionEmits>()

const bem = createBem('motion')

const mergedName = computed(() => {
  return bem.b() + '-' + props.name
})

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit(name as any, el)
  emit('visible-hook', name, el)
}

const onBeforeEnter = (el: Element) => {
  onVisibleHook('before-enter', el)
}

const onEnter = (el: Element) => {
  onVisibleHook('enter', el)
}

const onAfterEnter = (el: Element) => {
  onVisibleHook('after-enter', el)
}

const onEnterCancelled = (el: Element) => {
  onVisibleHook('enter-cancelled', el)
}

const onBeforeLeave = (el: Element) => {
  onVisibleHook('before-leave', el)
}

const onLeave = (el: Element) => {
  onVisibleHook('leave', el)
}

const onAfterLeave = (el: Element) => {
  onVisibleHook('after-leave', el)
}

const onLeaveCancelled = (el: Element) => {
  onVisibleHook('leave-cancelled', el)
}
</script>
