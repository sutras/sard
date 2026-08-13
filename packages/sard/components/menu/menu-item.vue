<template>
  <div :class="menuItemClass" @click="onClick">
    <div v-if="slots.icon || (hasIcon && direction === 'vertical')" :class="bem.e('icon')">
      <slot name="icon"></slot>
    </div>
    <div v-if="label || slots.default" :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUpdate, ref } from 'vue'
import { createBem } from '../../utils'
import { type MenuItemEmits, type MenuItemProps, type MenuItemSlots } from './common'
import { useMenuItem } from './context'

const props = withDefaults(defineProps<MenuItemProps>(), {})

const slots = defineSlots<MenuItemSlots>()

const emit = defineEmits<MenuItemEmits>()

const bem = createBem('menu')

// main

const hasIconSlot = ref(false)

onBeforeMount(() => {
  hasIconSlot.value = !!slots.icon
})

onBeforeUpdate(() => {
  hasIconSlot.value = !!slots.icon
})

const { select, hasIcon, direction } = useMenuItem(props, hasIconSlot)

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    select()
    emit('click', event)
  }
}

// others
const menuItemClass = computed(() => {
  return [bem.e('item'), bem.is('disabled', props.disabled)]
})
</script>
