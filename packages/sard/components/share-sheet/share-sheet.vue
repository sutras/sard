<template>
  <Popup
    effect="slide-bottom"
    :visible="innerVisible"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
  >
    <div :class="shareSheetClass">
      <template v-if="showTitle || showDescription">
        <div :class="bem.e('header')">
          <div v-if="showTitle" :class="bem.e('title')">
            <slot name="title">{{ title }}</slot>
          </div>
          <div v-if="showDescription" :class="bem.e('description')">
            <slot name="description">{{ description }}</slot>
          </div>
        </div>
      </template>

      <div :class="bem.e('body')">
        <slot></slot>
      </div>

      <template v-if="mergedShowCancel">
        <div :class="bem.e('gap')"></div>
        <div :class="bem.e('cancel')" @click="onCancel">
          <slot name="cancel">
            {{ cancel || t('cancel') }}
          </slot>
        </div>
      </template>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createBem, noop, isFunction } from '../../utils'
import Popup from '../popup/popup.vue'
import {
  type ShareSheetProps,
  type ShareSheetEmits,
  type ShareSheetSlots,
  type ShareSheetItemProps,
  defaultShareSheetProps,
} from './common'
import { useShareSheet } from './context'
import { useTranslateWithPrefix } from '../../locale'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<ShareSheetProps>(), defaultShareSheetProps)

const slots = defineSlots<ShareSheetSlots>()

const emit = defineEmits<ShareSheetEmits>()

const bem = createBem('share-sheet')

const { t } = useTranslateWithPrefix('shareSheet')

const mergedShowCancel = computed(() => {
  return !!(props.showCancel || props.cancel || !!slots.cancel)
})

const showTitle = computed(() => {
  return !!(props.title || slots.title)
})

const showDescription = computed(() => {
  return !!(props.description || slots.description)
})

// ============================ visible ============================
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const perhapsClose = (type: 'close' | 'cancel' | 'select') => {
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type)
    if (result instanceof Promise) {
      return result
        .then(() => {
          innerVisible.value = false
          emit('update:visible', false)
        })
        .catch(noop)
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = false
  emit('update:visible', false)
}

const onOverlayClick = () => {
  emit('close')
  if (props.overlayClosable) {
    perhapsClose('close')
  }
}

const onSelect = (item: ShareSheetItemProps) => {
  emit('select', { ...item })
  perhapsClose('select')
}

const onCancel = () => {
  emit('cancel')
  perhapsClose('cancel')
}

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit('visible-hook', name, el)
  emit(name as any, el)
}

// ============================ context ============================
useShareSheet({
  onSelect,
})

// ============================ style ============================
const shareSheetClass = computed(() => {
  return bem.b()
})
</script>
