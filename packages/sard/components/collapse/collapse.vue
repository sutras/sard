<template>
  <div :class="bem.b()" :style="collapseStyle" @transitionend="onTransitionEnd">
    <div v-if="rendered" ref="content" :class="contentClass" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, ref, useTemplateRef } from 'vue'
import { createBem, sleep } from '../../utils'
import { type CollapseProps, type CollapseSlots } from './common'

const props = withDefaults(defineProps<CollapseProps>(), {})

defineSlots<CollapseSlots>()

const bem = createBem('collapse')

// main
const contentRef = useTemplateRef('content')

const getHeight = () => {
  return contentRef.value!.getBoundingClientRect().height
}

const collapseHeight = ref<string>(props.visible ? 'auto' : '0px')

const rendered = ref(!props.lazy || props.visible)

const open = async () => {
  collapseHeight.value = '0px'
  rendered.value = true
  await sleep(0)
  const height = getHeight()
  collapseHeight.value = height + 'px'
}

const close = async () => {
  const height = getHeight()
  collapseHeight.value = height + 'px'
  await sleep(0)
  collapseHeight.value = '0px'
}

const onTransitionEnd = () => {
  if (collapseHeight.value !== '0px') {
    collapseHeight.value = 'auto'
  }
  if (!props.visible && props.destroyOnClose) {
    rendered.value = false
  }
}

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      open()
    } else {
      close()
    }
  },
)

const collapseStyle = computed(() => {
  return {
    height: collapseHeight.value,
    overflow: collapseHeight.value === 'auto' ? 'visible' : 'hidden',
  }
})
</script>
