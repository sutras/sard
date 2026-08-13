<template>
  <div ref="item" :class="dropdownItemClass" @click="onItemClick">
    <div v-if="label" :class="bem.e('label')">
      {{ label }}
    </div>
    <div v-if="title" :class="bem.e('title')">
      {{ title }}
    </div>
    <div v-if="!isNullish(innerValue)" :class="bem.e('value')">
      {{ currentLabel }}
    </div>
    <div v-else-if="placeholder" :class="bem.e('placeholder')">
      {{ placeholder }}
    </div>
    <div :class="bem.e('arrow')">
      <CaretUp v-if="isDisplayed" />
      <CaretDown v-else />
    </div>
  </div>

  <div v-show="isDisplayed" ref="popper" :class="popoverClass" :style="popoverStyle">
    <Overlay style="position: absolute" :visible="innerVisible" @click="onOverlayClick" />
    <Motion :name="popupEffect" @visible-hook="onVisibleHook">
      <div v-show="innerVisible" :class="popupClass">
        <slot>
          <List inlaid>
            <ListItem
              v-for="(option, i) in options"
              :key="i"
              :title="option.label"
              hover
              :class="[bem.e('option'), bem.is('active', option.value === innerValue)]"
              @click="onOptionClick(option)"
            >
              <template #arrow>
                <div :class="bem.e('option-icon')">
                  <Success />
                </div>
              </template>
            </ListItem>
          </List>
        </slot>
      </div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  type StyleValue,
  useTemplateRef,
  useModel,
} from 'vue'
import { createBem, isNullish, isFunction, noop } from '../../utils'
import List from '../list/list.vue'
import ListItem from '../list/list-item.vue'
import Overlay from '../overlay/overlay.vue'
import {
  type DropdownItemProps,
  type DropdownItemSlots,
  type DropdownItemEmits,
  type DropdownOption,
  type DropdownCloseType,
  dropdownContextKey,
  defaultDropdownItemProps,
  defaultValueOnClear,
  type DropdownItemInstacne,
} from './common'
import { useClickOutside, useLockScroll } from '../../use'
import { CaretDown, CaretUp, Success } from '@sard/icons'
import type { MotionHookName } from '../motion/common'
import Motion from '../motion/motion.vue'

const props = withDefaults(defineProps<DropdownItemProps>(), defaultDropdownItemProps)

defineSlots<DropdownItemSlots>()

const emit = defineEmits<DropdownItemEmits>()

const bem = createBem('dropdown-item')

// main

const context = inject(dropdownContextKey)

if (!context) {
  throw new Error('DropdownItem must be included in Dropdown.')
}

const currentLabel = computed(() => {
  return props.options?.find((option) => option.value === innerValue.value)?.label
})

// ============================ visible ============================
const innerVisible = useModel(props, 'visible')
const isDisplayed = ref(innerVisible.value)

const popupEffect = computed(() => {
  return context.direction === 'up' ? 'slide-bottom' : 'slide-top'
})

const onVisibleHook = (name: MotionHookName, el: Element) => {
  if (name === 'before-enter') {
    isDisplayed.value = true
    context.hideOthers(member)
  } else if (name === 'enter') {
    setPosition()
  } else if (name === 'after-leave') {
    isDisplayed.value = false
  }

  if (name === 'after-enter' || name === 'enter-cancelled') {
    waitingOpen = false
  }

  if (name === 'after-leave' || name === 'leave-cancelled') {
    waitingClose = false
  }

  emit('visible-hook', name, el)
  emit(name as any, el)
}

useLockScroll(innerVisible)

const popperInset = ref<StyleValue>()

const itemRef = useTemplateRef('item')

const setPosition = () => {
  const itemRect = itemRef.value!.getBoundingClientRect()
  const windowHeight = window.innerHeight

  const nextPopperInset: Record<string, any> = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }

  if (context.direction === 'down') {
    nextPopperInset.top = `${itemRect.bottom}px`
    nextPopperInset.bottom = 0
  } else {
    nextPopperInset.top = 0
    nextPopperInset.bottom = `${windowHeight - itemRect.top}px`
  }

  popperInset.value = nextPopperInset
}

let waitingClose = false

const perhapsClose = (type: DropdownCloseType) => {
  if (waitingClose) {
    return
  }
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type)
    if (result instanceof Promise) {
      waitingClose = true

      return result
        .then(() => {
          innerVisible.value = false
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = false
}

let waitingOpen = false

const perhapsOpen = () => {
  if (waitingOpen) {
    return
  }
  if (isFunction(props.beforeOpen)) {
    const result = props.beforeOpen()
    if (result instanceof Promise) {
      waitingOpen = true

      return result
        .then(() => {
          innerVisible.value = true
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = true
}

const onItemClick = () => {
  if (!context.disabled && !props.disabled) {
    if (innerVisible.value) {
      perhapsClose('button')
    } else {
      perhapsOpen()
    }
  }
}

const onOverlayClick = () => {
  if (context.overlayClosable) {
    perhapsClose('overlay')
  }
}

useClickOutside(
  useTemplateRef('popper'),
  () => {
    if (context.awayClosable) {
      perhapsClose('away')
    }
  },
  innerVisible,
)

// ============================ value ============================
const innerValue = useModel(props, 'modelValue')

const mergedTogglable = computed(() => props.togglable || context.togglable)

const mergedValueOnClear = computed(
  () => props.valueOnClear || context.valueOnClear || defaultValueOnClear,
)

const onOptionClick = (option: DropdownOption) => {
  let nextValue = option.value

  if (option.value === innerValue.value && mergedTogglable.value) {
    const value = mergedValueOnClear.value()
    nextValue = value
  }

  if (nextValue !== innerValue.value) {
    innerValue.value = nextValue
    emit('change', nextValue)
  }

  perhapsClose('option')
}

// ============================ member ============================
const hide = () => {
  if (innerVisible.value) {
    perhapsClose('other-button')
  }
}

const member: DropdownItemInstacne = reactive({
  hide,
  visible: isDisplayed,
})

onMounted(() => {
  context.register(member)
})

onUnmounted(() => {
  context.unregister(member)
})

// others
const dropdownItemClass = computed(() => {
  return [
    bem.b(),
    bem.m(context.direction),
    bem.is('displayed', isDisplayed.value),
    bem.is('disabled', context.disabled || props.disabled),
  ]
})

const popoverClass = computed(() => {
  return bem.e('popover')
})

const popoverStyle = computed(() => {
  return popperInset.value
})

const popupClass = computed(() => {
  return [bem.e('popup'), bem.em('popup', popupEffect.value)]
})
</script>
