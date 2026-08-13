<template>
  <div :class="navbarClass" @click="$emit('click', $event)">
    <div v-if="slots.icon" :class="bem.e('item-icon')">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type NavbarItemProps, type NavbarItemSlots, type NavbarItemEmits } from './common'

const props = withDefaults(defineProps<NavbarItemProps>(), {})

const slots = defineSlots<NavbarItemSlots>()

defineEmits<NavbarItemEmits>()

const bem = createBem('navbar')

const navbarClass = computed(() => {
  return [bem.e('item'), bem.m('reverse', props.reverse)]
})
</script>
