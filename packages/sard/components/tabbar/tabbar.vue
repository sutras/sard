<template>
  <div :class="tabbarClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { createBem } from '../../utils'
import {
  type TabbarProps,
  type TabbarSlots,
  type TabbarEmits,
  type TabbarContext,
  tabbarContextKey,
  defaultTabbarProps,
} from './common'

const props = withDefaults(defineProps<TabbarProps>(), defaultTabbarProps)

defineSlots<TabbarSlots>()

const emit = defineEmits<TabbarEmits>()

const bem = createBem('tabbar')

const innerValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue !== innerValue.value) {
      innerValue.value = props.modelValue
    }
  },
)

const select: TabbarContext['select'] = (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  tabbarContextKey,
  reactive({
    color: toRef(() => props.color),
    activeColor: toRef(() => props.activeColor),
    value: innerValue,
    select,
  }),
)

// ============================ style ============================
const tabbarClass = computed(() => {
  return [
    bem.b(),
    bem.m('bordered', props.bordered),
    bem.m('fixed', props.fixed),
    bem.m('safe', props.safeAreaInsetBottom),
  ]
})
</script>
