<template>
  <div
    ref="nav"
    :class="bem.e('nav')"
    :style="navStyle"
    @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
  >
    <div
      v-for="(name, i) in anchors"
      :key="i"
      :class="[bem.e('nav-item'), bem.em('nav-item', 'active', name === innerCurrent)]"
    >
      {{ name }}
    </div>
    <Motion name="fade">
      <div
        v-show="hintVisible"
        :class="bem.e('hint')"
        :style="{
          top: hintTop,
        }"
      >
        <div :class="bem.e('hint-text')">
          {{ innerCurrent }}
        </div>
      </div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useTemplateRef, useModel } from 'vue'
import { createBem, clamp, cssVarName } from '../../utils'
import { type IndexesNavProps, type IndexesNavSlots, type IndexesNavEmits } from './common'
import { usePointerDown } from '../../use'
import Motion from '../motion/motion.vue'

const props = withDefaults(defineProps<IndexesNavProps>(), {})

defineSlots<IndexesNavSlots>()

const emit = defineEmits<IndexesNavEmits>()

const bem = createBem('indexes')

const itemSize = 20
const navRef = useTemplateRef('nav')
const navRect = ref<DOMRect>()
const hintVisible = ref(false)

const innerCurrent = useModel(props, 'current')

const hintTop = computed(() => {
  let index = innerCurrent.value !== undefined ? props.anchors.indexOf(innerCurrent.value) : -1
  if (index < 0) {
    index = 0
  }
  return index * itemSize + itemSize / 2 + 'px'
})

const calcPosition = (touch: Touch) => {
  const offsetY = touch.clientY - navRect.value!.top
  const itemIndex = clamp(Math.floor(offsetY / itemSize), 0, props.anchors.length - 1)
  const current = props.anchors[itemIndex]

  if (current !== innerCurrent.value) {
    innerCurrent.value = current
    emit('change', current)
  }
}

const onTouchStart = (event: TouchEvent) => {
  hintVisible.value = true
  navRect.value = navRef.value!.getBoundingClientRect()
  calcPosition(event.touches[0])
}

const onTouchMove = (event: TouchEvent) => {
  calcPosition(event.touches[0])
}

const onTouchEnd = () => {
  hintVisible.value = false
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

const navStyle = computed(() => {
  return {
    [cssVarName('indexes-nav-item-size')]: `${itemSize}px`,
  }
})
</script>
