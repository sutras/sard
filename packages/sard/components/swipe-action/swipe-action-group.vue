<template>
  <div :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import { createBem } from '../../utils'
import {
  type SwipeActionGroupProps,
  type SwipeActionGroupSlots,
  type SwipeActionGroupExpose,
  type SwipeActionGroupContext,
  type SwipeActionExpose,
  swipeActionGroupContextKey,
  defaultSwipeActionGroupProps,
} from './common'

const props = withDefaults(defineProps<SwipeActionGroupProps>(), defaultSwipeActionGroupProps)

defineSlots<SwipeActionGroupSlots>()

const bem = createBem('swipe-action-group')

const itemMap = new Map<string, SwipeActionExpose>()

const closeAll: SwipeActionGroupContext['closeAll'] = (exceptId) => {
  itemMap.forEach((item, id) => {
    if (id !== exceptId) {
      item.hide()
    }
  })
}

const register = (id: string, expose: SwipeActionExpose) => {
  itemMap.set(id, expose)
}

const unregister = (id: string) => {
  itemMap.delete(id)
}

provide(
  swipeActionGroupContextKey,
  reactive({
    multiple: toRef(() => props.multiple),
    register,
    unregister,
    closeAll,
  }),
)

defineExpose<SwipeActionGroupExpose>({
  closeAll: () => closeAll(),
})
</script>
