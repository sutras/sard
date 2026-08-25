<template>
  <div :class="dropdownClass">
    <slot></slot>
    <div v-if="separator === 'shadow'" :class="bem.e('shadow')"></div>
    <div v-if="separator === 'line'" :class="bem.e('line')"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, provide, toRef, reactive } from 'vue'
import { createBem } from '../../utils'
import {
  type DropdownProps,
  type DropdownSlots,
  type DropdownContext,
  dropdownContextKey,
  defaultDropdownProps,
  type DropdownItemInstacne,
} from './common'

const props = withDefaults(defineProps<DropdownProps>(), defaultDropdownProps)

defineSlots<DropdownSlots>()

const bem = createBem('dropdown')

const items = ref<DropdownItemInstacne[]>([])

const someVisible = computed(() => {
  return [...items.value.values()].some((item) => item.visible)
})

const hideOthers: DropdownContext['hideOthers'] = (instance) => {
  items.value.forEach((item) => {
    if (item !== instance) {
      item.hide()
    }
  })
}

const register: DropdownContext['register'] = (instance) => {
  items.value.push(instance)
}

const unregister: DropdownContext['unregister'] = (instance) => {
  const index = items.value.indexOf(instance)
  if (index !== -1) {
    items.value.splice(index, 1)
  }
}

provide(
  dropdownContextKey,
  reactive({
    direction: toRef(() => props.direction),
    disabled: toRef(() => props.disabled),
    awayClosable: toRef(() => props.awayClosable),
    overlayClosable: toRef(() => props.overlayClosable),
    togglable: toRef(() => props.togglable),
    valueOnClear: toRef(() => props.valueOnClear),
    hideOthers,
    register,
    unregister,
  }),
)

const dropdownClass = computed(() => {
  return [bem.b(), bem.is('show', someVisible.value), bem.m(props.direction)]
})
</script>
