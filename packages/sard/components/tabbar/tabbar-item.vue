<template>
  <div :class="tabbarItemClass" :style="tabbarItemStyle" @click="onClick">
    <slot>
      <div :class="bem.e('icon')">
        <slot name="icon" :active="isActive"></slot>
      </div>
      <div :class="bem.e('label')">
        {{ label }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem } from '../../utils'
import {
  type TabbarItemProps,
  type TabbarItemSlots,
  type TabbarItemEmits,
  tabbarContextKey,
} from './common'

const props = withDefaults(defineProps<TabbarItemProps>(), {})

defineSlots<TabbarItemSlots>()

const emit = defineEmits<TabbarItemEmits>()

const bem = createBem('tabbar')

const context = inject(tabbarContextKey)

if (!context) {
  throw new Error('TabbarItem must be included in Tabbar.')
}

const isActive = computed(() => {
  return context.value === props.value
})

const onClick = (event: any) => {
  if (props.value !== undefined) {
    context.select(props.value)
  }
  emit('click', event)
}

// ============================ style ============================
const tabbarItemClass = computed(() => {
  return [bem.e('item'), bem.em('item', 'active', isActive.value)]
})

const tabbarItemStyle = computed(() => {
  return {
    color: isActive.value ? context.activeColor : context.color,
  }
})
</script>
