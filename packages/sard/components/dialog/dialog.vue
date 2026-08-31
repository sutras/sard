<template>
  <Popup
    effect="zoom"
    :visible="visible"
    :class="bem.e('popup')"
    :close-on-back-press="closeOnBackPress"
    @overlay-click="onOverlayClick"
    @back-press="onBackPress"
    @visible-hook="onVisibleHook"
  >
    <div :class="dialogClass">
      <div v-if="headed" :class="bem.e('header')">
        <div v-if="title" :class="bem.e('title')">
          {{ title }}
        </div>
        <div :class="bem.e('close')">
          <Button variant="link" color="secondary" size="large" block @click="onClose">
            <Close />
          </Button>
        </div>
      </div>

      <div v-if="(!headed && title) || message" :class="bem.e('body')">
        <div v-if="!headed && title" :class="bem.e('title')">
          {{ title }}
        </div>
        <div v-if="message" :class="bem.e('message')">
          <span>{{ message }}</span>
        </div>
      </div>
      <slot></slot>

      <div :class="bem.e('footer')">
        <Button
          v-if="showCancel"
          :class="bem.e('button')"
          :loading="loading.cancel"
          :variant="buttonProps.cancel.variant"
          :color="buttonProps.cancel.color"
          :size="buttonProps.cancel.size"
          :round="buttonProps.cancel.round"
          block
          v-bind="cancelProps"
          @click="onCancel"
        >
          {{ cancelText || t('cancel') }}
        </Button>
        <div v-if="showCancel && buttonType === 'text'" :class="bem.e('divider')" />
        <Button
          v-if="showConfirm"
          :class="bem.e('button')"
          :loading="loading.confirm"
          :variant="buttonProps.confirm.variant"
          :color="buttonProps.confirm.color"
          :size="buttonProps.confirm.size"
          :round="buttonProps.confirm.round"
          block
          v-bind="confirmProps"
          @click="onConfirm"
        >
          {{ confirmText || t('confirm') }}
        </Button>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, ref, watch, readonly, reactive } from 'vue'
import { createBem, noop, isFunction } from '../../utils'
import { useTranslateWithPrefix } from '../../locale'
import Popup from '../popup/popup.vue'
import Button from '../button/button.vue'
import { type DialogProps, type DialogEmits, type DialogSlots, defaultDialogProps } from './common'
import { type ButtonProps } from '../button'
import { Close } from '@sard/icons'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<DialogProps>(), defaultDialogProps)

defineSlots<DialogSlots>()

const emit = defineEmits<DialogEmits>()

const bem = createBem('dialog')

const { t } = useTranslateWithPrefix('dialog')

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
  confirm: false,
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
        confirm: false,
        close: false,
      })
    }
  },
  {
    flush: 'sync',
  },
)

const perhapsClose = (type: 'close' | 'cancel' | 'confirm') => {
  emit(type as any)
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type, readonlyLoading)
    if (result instanceof Promise) {
      loading[type] = true

      const obj = {
        valid: true,
      }
      asyncSet.add(obj)

      return result
        .then(() => {
          if (obj.valid) {
            innerVisible.value = false
            emit('update:visible', false)
          }
        })
        .catch(noop)
        .finally(() => {
          loading[type] = false
          asyncSet.delete(obj)
        })
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = false
  emit('update:visible', false)
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    perhapsClose('close')
  }
}

const onBackPress = () => {
  perhapsClose('close')
}

const onClose = () => {
  perhapsClose('close')
}

const onConfirm = () => {
  perhapsClose('confirm')
}

const onCancel = () => {
  perhapsClose('cancel')
}

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit('visible-hook', name, el)
  emit(name as any, el)
}

const buttonProps = computed(() => {
  const buttonTypes: Record<
    NonNullable<DialogProps['buttonType']>,
    Record<'cancel' | 'confirm', ButtonProps>
  > = {
    text: {
      cancel: {
        variant: 'text',
        color: 'secondary',
        size: 'large',
      },
      confirm: {
        variant: 'text',
        color: 'primary',
        size: 'large',
      },
    },
    round: {
      cancel: {
        variant: 'filled',
        color: 'primary',
        round: true,
      },
      confirm: {
        variant: 'solid',
        color: 'primary',
        round: true,
      },
    },
  }
  return buttonTypes[props.buttonType]
})

// ============================ style ============================

const dialogClass = computed(() => {
  return [
    bem.b(),
    bem.m('headed', props.headed),
    bem.m('untitled', !props.title),
    bem.m(props.buttonType),
  ]
})
</script>
