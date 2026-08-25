<template>
  <div :class="rateClass">
    <div
      ref="rate"
      :class="bem.e('content')"
      :style="contentStyle"
      @touchstart.stop.prevent="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @pointerdown="onPointerDown"
    >
      <div
        v-for="(item, i) in starList"
        :key="i"
        ref="items"
        :class="bem.e('item')"
        :data-index="i"
        :style="{
          fontSize: size,
        }"
        @click="onClick($event, i)"
      >
        <div
          :class="bem.e('void-star')"
          :style="{
            color: isDisabled ? undefined : voidColor,
          }"
        >
          <slot v-if="voidText || slots['void-star']" name="void-star">
            {{ voidText }}
          </slot>
          <Star v-else />
        </div>
        <div
          :class="bem.e('star')"
          :style="{
            color: isDisabled ? undefined : color,
            width: item.width,
          }"
        >
          <slot v-if="text || slots['star']" name="star">
            {{ text }}
          </slot>
          <StarFill v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import { type RateProps, type RateEmits, defaultRateProps, type RateSlots } from './common'
import { usePointerDown, useRtl } from '../../use'
import { Star, StarFill } from '@sard/icons'

const props = withDefaults(defineProps<RateProps>(), defaultRateProps)

const slots = defineSlots<RateSlots>()

const emit = defineEmits<RateEmits>()

const bem = createBem('rate')

const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const innerValue = ref(props.modelValue ?? 0)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue ?? 0

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const rateRef = useTemplateRef('rate')
const itemRefs = useTemplateRef('items')
const firstStar = computed(() => {
  return itemRefs.value?.find((item) => item.dataset.index === '0')
})
const rateRect = ref<DOMRect>()
const firstStarRect = ref<DOMRect>()

const isRtl = useRtl(rateRef)

const starList = computed(() => {
  return Array(props.count)
    .fill(0)
    .map((_, index) => {
      const diff = index + 1 - innerValue.value
      const width = (diff <= 0 ? 1 : diff > 1 ? 0 : innerValue.value % 1) * 100 + '%'

      return {
        width,
      }
    })
})

const onClick = (event: MouseEvent | TouchEvent, index: number) => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  let nextValue: number

  if (props.allowHalf) {
    const { left: rateLeft, width: rateWidth } = rateRef.value!.getBoundingClientRect()
    const starWidth = firstStar.value!.getBoundingClientRect().width

    const { clientX } = 'touches' in event ? event.touches[0] : event
    const offsetX = clientX - rateLeft
    const gap = (rateWidth - props.count * starWidth) / (props.count - 1)
    const itemOffsetLeft = index * (starWidth + gap)
    const isHalf = offsetX - itemOffsetLeft <= starWidth / 2
    nextValue = index + (isHalf ? 0.5 : 1)
  } else {
    nextValue = index + 1
  }

  if (props.clearable && nextValue === innerValue.value) {
    nextValue = 0
  }

  if (nextValue !== undefined && nextValue !== innerValue.value) {
    innerValue.value = nextValue
    emit('update:modelValue', nextValue)
    emit('change', nextValue)
  }
}

const onTouchStart = () => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  rateRect.value = rateRef.value!.getBoundingClientRect()
  firstStarRect.value = firstStar.value!.getBoundingClientRect()
}

const onTouchMove = (event: TouchEvent) => {
  if (isReadonly.value || isDisabled.value) {
    return
  }

  if (!rateRect.value || !firstStarRect.value) {
    return
  }

  const { left: rateLeft, width: rateWidth } = rateRect.value

  const { clientX } = event.touches[0]
  let offsetX = clientX - rateLeft
  let nextValue: number | undefined

  if (isRtl.value) {
    offsetX = rateWidth - offsetX
  }

  if (offsetX < 0) {
    nextValue = 0
  } else {
    const { width: starWidth } = firstStarRect.value
    const gap = (rateWidth - props.count * starWidth) / (props.count - 1)

    for (let i = props.count - 1; i >= 0; i--) {
      const left = i * (gap + starWidth)

      if (offsetX >= left) {
        const index = i + (props.allowHalf && offsetX <= left + starWidth / 2 ? 0.5 : 1)
        nextValue = index
        break
      }
    }
  }

  if (nextValue === 0 && !props.clearable) {
    nextValue = props.allowHalf ? 0.5 : 1
  }

  if (nextValue !== undefined && nextValue !== innerValue.value) {
    innerValue.value = nextValue
    emit('update:modelValue', nextValue)
    emit('change', nextValue)
  }
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove)

// ============================ style ============================
const rateClass = computed(() => {
  return [bem.b(), bem.m('disabled', isDisabled.value), bem.m('readonly', isReadonly.value)]
})

const contentStyle = computed(() => {
  return {
    gap: props.gap,
  }
})
</script>
