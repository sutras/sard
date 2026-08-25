<template>
  <Popup
    effect="slide-bottom"
    :visible="visible"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :background="background"
    :transparent="transparent"
    :destroy-on-close="destroyOnClose"
    :lazy="lazy"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
  >
    <div :class="popoutClass" @transitionend.stop>
      <div :class="[bem.e('header'), bem.em('header', props.type)]">
        <div
          v-if="type === 'compact' && mergedShowCancel"
          :class="[bem.e('button-wrap'), bem.em('button-wrap', 'start')]"
        >
          <slot
            name="cancel"
            :on-click="onCancel"
            :loading="loading.cancel"
            :text="mergedCancelText"
          >
            <Button
              variant="link"
              color="secondary"
              :loading="loading.cancel"
              block
              @click="onCancel"
            >
              {{ mergedCancelText }}
            </Button>
          </slot>
        </div>
        <slot name="title-prepend"></slot>
        <div :class="bem.e('title')">
          <slot name="title">
            <span :class="bem.e('title-text')">{{ title }}</span>
          </slot>
        </div>
        <div
          v-if="type === 'compact' && showConfirm"
          :class="[bem.e('button-wrap'), bem.em('button-wrap', 'end')]"
        >
          <slot
            name="confirm"
            :on-click="onConfirm"
            :disabled="confirmDisabled"
            :loading="loading.confirm"
            :text="mergedConfirmText"
          >
            <Button
              variant="link"
              color="primary"
              :loading="loading.confirm"
              :disabled="confirmDisabled"
              block
              @click="onConfirm"
            >
              {{ mergedConfirmText }}
            </Button>
          </slot>
        </div>
        <div v-if="type === 'loose' && showClose" :class="bem.e('close')" @click="onCloseClick">
          <Button variant="link" color="secondary" size="large" block>
            <Close />
          </Button>
        </div>
      </div>
      <slot></slot>
      <div v-if="showFooter && type === 'loose'" :class="bem.e('footer')">
        <slot
          v-if="mergedShowCancel"
          name="cancel"
          :on-click="onCancel"
          :loading="loading.cancel"
          :text="mergedCancelText"
        >
          <Button
            variant="filled"
            color="primary"
            round
            :loading="loading.cancel"
            block
            @click="onCancel"
          >
            {{ mergedCancelText }}
          </Button>
        </slot>
        <slot
          v-if="showConfirm"
          name="confirm"
          :on-click="onConfirm"
          :disabled="confirmDisabled"
          :loading="loading.confirm"
          :text="mergedConfirmText"
        >
          <Button
            variant="solid"
            color="primary"
            round
            :loading="loading.confirm"
            :disabled="confirmDisabled"
            block
            @click="onConfirm"
          >
            {{ mergedConfirmText }}
          </Button>
        </slot>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, reactive, readonly, ref, useModel, watch } from 'vue'
import { createBem, noop, isFunction, isBoolean } from '../../utils'
import Popup from '../popup/popup.vue'
import Button from '../button/button.vue'
import { usePopupVisibleHookProvide } from '../popup/common'
import { useTranslateWithPrefix } from '../../locale'
import { type PopoutProps, type PopoutSlots, type PopoutEmits, defaultPopoutProps } from './common'
import { Close } from '@sard/icons'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<PopoutProps>(), defaultPopoutProps)

defineSlots<PopoutSlots>()

const emit = defineEmits<PopoutEmits>()

const bem = createBem('popout')

const { t } = useTranslateWithPrefix('popout')

const mergedShowCancel = computed(() => {
  return isBoolean(props.showCancel) ? props.showCancel : props.type === 'loose' ? false : true
})

// ============================ visible ============================
const innerVisible = useModel(props, 'visible')

const callVisibleHook = usePopupVisibleHookProvide()

const onVisibleHook = (name: MotionHookName, el: Element) => {
  callVisibleHook(name)
  emit('visible-hook', name, el)
  emit(name as any, el)
}

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
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    perhapsClose('close')
  }
}

const onCloseClick = () => {
  perhapsClose('close')
}

const onConfirm = () => {
  perhapsClose('confirm')
}

const onCancel = () => {
  perhapsClose('cancel')
}

const mergedConfirmText = computed(() => {
  return props.confirmText || t('confirm')
})

const mergedCancelText = computed(() => {
  return props.cancelText || t('cancel')
})

// ============================ style ============================
const popoutClass = computed(() => {
  return [bem.b(), bem.m('divided', props.showShadow)]
})
</script>
