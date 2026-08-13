<template>
  <div :class="loadingClass">
    <div :class="iconClass" :style="iconStyle">
      <slot v-if="type === 'circular'" name="circular">
        <div :class="bem.e('spinner')"></div>
      </slot>
      <template v-else-if="type === 'clock'">
        <div
          v-for="i in 12"
          :key="i"
          :class="[
            bem.e('scale'),
            bem.em('scale', i),
            !props.animated
              ? {
                  [bem.em('scale', 'hidden')]: i > scaleShowNum,
                }
              : null,
          ]"
        ></div>
      </template>
    </div>

    <div
      v-if="isRenderVisible(slots.default || text)"
      :class="bem.e('text')"
      :style="loadingTextStyle"
    >
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isRenderVisible, createBem } from '../../utils'
import { type LoadingProps, type LoadingSlots, defaultLoadingProps } from './common'

const props = withDefaults(defineProps<LoadingProps>(), defaultLoadingProps)

const slots = defineSlots<LoadingSlots>()

const bem = createBem('loading')

// main
const scaleShowNum = computed(() => {
  return Math.max(Math.floor(props.progress * 12), 1)
})

// others
const loadingClass = computed(() => {
  return [bem.b(), bem.m('vertical', props.vertical)]
})

const iconClass = computed(() => {
  return [bem.e('icon'), bem.em('icon', props.type), bem.em('icon', 'animated', props.animated)]
})

const iconStyle = computed(() => {
  return [
    {
      color: props.color,
      fontSize: props.size,
    },
    props.type === 'circular' && !props.animated
      ? {
          transform: `rotate(${props.progress * 360}deg)`,
        }
      : null,
  ]
})

const loadingTextStyle = computed(() => {
  return { color: props.textColor, fontSize: props.textSize }
})
</script>
