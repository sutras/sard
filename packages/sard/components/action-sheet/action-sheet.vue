<template>
  <Popup
    effect="slide-bottom"
    :visible="innerVisible"
    :close-on-back-press="closeOnBackPress"
    @overlay-click="onOverlayClick"
    @back-press="onBackPress"
    @visible-hook="onVisibleHook"
  >
    <div :class="actionSheetClass">
      <template v-if="showDescription">
        <div :class="bem.e('description')">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>

      <div :class="bem.e('content')">
        <template v-if="itemList && itemList.length > 0">
          <ActionSheetItem v-for="(item, i) in itemList" :key="i" v-bind="item" />
        </template>
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
import { reactive, readonly, ref, watch, computed } from 'vue'
import { createBem, noop, isFunction } from '../../utils'
import Popup from '../popup/popup.vue'
import ActionSheetItem from './action-sheet-item.vue'
import {
  type ActionSheetItemProps,
  type ActionSheetProps,
  type ActionSheetEmits,
  type ActionSheetSlots,
  defaultActionSheetProps,
} from './common'
import { useTranslateWithPrefix } from '../../locale'
import { useActionSheet } from './context'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<ActionSheetProps>(), defaultActionSheetProps)

const slots = defineSlots<ActionSheetSlots>()

const emit = defineEmits<ActionSheetEmits>()

const bem = createBem('action-sheet')

const { t } = useTranslateWithPrefix('actionSheet')

const mergedShowCancel = computed(() => {
  return !!(props.showCancel || props.cancel || slots.cancel)
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

const loading = reactive({
  cancel: false,
  select: false,
  close: false,
})

const readonlyLoading = readonly(loading)

const asyncSet = new Set<{ valid: boolean }>()

watch(
  innerVisible,
  () => {
    if (innerVisible.value === false) {
      asyncSet.forEach((obj) => {
        obj.valid = false
      })
      Object.assign(loading, {
        cancel: false,
        select: false,
        close: false,
      })
    }
  },
  {
    flush: 'sync',
  },
)

function perhapsClose(type: 'close' | 'cancel'): any
function perhapsClose(type: 'select', item: ActionSheetItemProps, index: number): any
function perhapsClose(
  type: 'close' | 'cancel' | 'select',
  item?: ActionSheetItemProps,
  index?: number,
) {
  if (isFunction(props.beforeClose)) {
    const result =
      type === 'select'
        ? props.beforeClose(type, readonlyLoading, item!, index!)
        : props.beforeClose(type, readonlyLoading)
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
  if (props.overlayClosable) {
    emit('close')
    perhapsClose('close')
  }
}

const onBackPress = () => {
  emit('close')
  perhapsClose('close')
}

const onSelect = (item: ActionSheetItemProps, index: number) => {
  if (!item.disabled && !item.loading) {
    item = { ...item }
    emit('select', item, index)
    perhapsClose('select', item, index)
  }
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
const context = props.internalContext || useActionSheet()

context.setSelectCallback(onSelect)

// ============================ style ============================
const actionSheetClass = computed(() => {
  return [bem.b(), bem.m('headless', !showDescription.value)]
})
</script>
