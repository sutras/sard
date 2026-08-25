<template>
  <div :class="tabbarItemClass" :style="tabbarItemStyle" @click="onClick">
    <slot>
      <div :class="bem.e('icon')">
        <slot name="icon" :active="isCurrent"></slot>
      </div>
      <div :class="bem.e('text')">
        {{ text }}
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

const isCurrent = computed(() => {
  return context.current === props.name
})

const onClick = (event: any) => {
  if (props.name !== undefined) {
    context.select(props.name)
  }
  emit('click', event)
}

// ============================ style ============================
const tabbarItemClass = computed(() => {
  return [bem.e('item'), bem.em('item', 'current', isCurrent.value)]
})

const tabbarItemStyle = computed(() => {
  return {
    color: isCurrent.value ? context.activeColor : context.color,
  }
})
</script>
