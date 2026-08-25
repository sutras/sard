<template>
  <div :class="menuClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type MenuProps, type MenuEmits, defaultMenuProps, type MenuSlots } from './common'
import { useMenu, type MenuMember } from './context'

const props = withDefaults(defineProps<MenuProps>(), defaultMenuProps)

defineSlots<MenuSlots>()

const emit = defineEmits<MenuEmits>()

const bem = createBem('menu')

const onSelect = (item: MenuMember) => {
  emit('select', { ...item.props })
}

const { hasIcon } = useMenu({ props, onSelect })

// ============================ style ============================
const menuClass = computed(() => {
  return [bem.b(), bem.m(props.direction), bem.m(props.theme), bem.has('icon', hasIcon.value)]
})
</script>
