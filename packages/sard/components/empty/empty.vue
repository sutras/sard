<template>
  <div :class="emptyClass">
    <div :class="bem.e('icon')" :style="iconStyle">
      <slot name="icon">
        <Empty />
      </slot>
    </div>
    <slot name="description">
      <div :class="bem.e('description')">
        {{ description || t('noData') }}
      </div>
    </slot>
    <div v-if="slots.default" :class="bem.e('extra')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, createBem } from '../../utils'
import { useTranslateWithPrefix } from '../../locale'
import { type EmptyProps, type EmptySlots, defaultEmptyProps } from './common'
import { Empty } from '@sard/icons'

const { t } = useTranslateWithPrefix('empty')

const props = withDefaults(defineProps<EmptyProps>(), defaultEmptyProps)

const slots = defineSlots<EmptySlots>()

const bem = createBem('empty')

// main

// others
const emptyClass = computed(() => {
  return [bem.b(), bem.m(props.size)]
})

const iconStyle = computed(() => {
  return {
    fontSize: addUnit(props.iconSize),
  }
})
</script>
