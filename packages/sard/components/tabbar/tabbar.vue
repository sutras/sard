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

// main
const innerCurrent = ref(props.current)
watch(
  () => props.current,
  () => {
    if (props.current !== innerCurrent.value) {
      innerCurrent.value = props.current
    }
  },
)

const select: TabbarContext['select'] = (name) => {
  innerCurrent.value = name
  emit('update:current', name)
  emit('change', name)
}

provide(
  tabbarContextKey,
  reactive({
    color: toRef(() => props.color),
    activeColor: toRef(() => props.activeColor),
    current: innerCurrent,
    select,
  }),
)

// others
const tabbarClass = computed(() => {
  return [
    bem.b(),
    bem.m('bordered', props.bordered),
    bem.m('fixed', props.fixed),
    bem.m('safe', props.safeAreaInsetBottom),
  ]
})
</script>
