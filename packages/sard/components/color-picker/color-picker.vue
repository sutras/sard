<template>
  <div :class="colorPickerClass">
    <div
      ref="panel"
      :class="bem.e('panel')"
      :style="panelStyle"
      @touchstart.stop.prevent="onPanelTouchStart"
      @touchmove.stop.prevent="onPanelTouchMove"
      @touchend="onPanelTouchEnd"
      @touchcancel="onPanelTouchEnd"
      @pointerdown="onPanelPointerDown"
    >
      <div :class="bem.e('thumb')" :style="panelThumbStyle"></div>
    </div>

    <div
      ref="hueBar"
      :class="[bem.e('slider-bar'), bem.em('slider-bar', 'hue')]"
      @touchstart.stop.prevent="onHueTouchStart"
      @touchmove.stop.prevent="onHueTouchMove"
      @touchend="onHueTouchEnd"
      @touchcancel="onHueTouchEnd"
      @pointerdown="onHuePointerDown"
    >
      <div :class="bem.e('thumb')" :style="hueThumbStyle"></div>
    </div>

    <div
      v-if="props.showAlpha"
      ref="alphaBar"
      :class="[bem.e('slider-bar'), bem.em('slider-bar', 'alpha')]"
      @touchstart.stop.prevent="onAlphaTouchStart"
      @touchmove.stop.prevent="onAlphaTouchMove"
      @touchend="onAlphaTouchEnd"
      @touchcancel="onAlphaTouchEnd"
      @pointerdown="onAlphaPointerDown"
    >
      <div :class="bem.e('alpha-fill')" :style="alphaBarStyle"></div>
      <div :class="bem.e('thumb')" :style="alphaThumbStyle"></div>
    </div>

    <div :class="bem.e('info')">
      <div :class="bem.e('preview')">
        <div :class="bem.e('preview-fill')" :style="previewStyle"></div>
      </div>

      <div :class="bem.e('value')">{{ outputValue }}</div>

      <Popover v-if="showFormat" v-model:visible="formatPopoverVisible" position="top">
        <template #reference>
          <div :class="[bem.e('format'), bem.em('format', 'active', formatPopoverVisible)]">
            {{ displayFormat }}
            <Up v-if="formatPopoverVisible" />
            <Down v-else />
          </div>
        </template>
        <Menu @select="onFormatSelect">
          <MenuItem
            v-for="option in formatOptions"
            :key="option.value"
            :value="option.value"
            :label="option.value"
          />
        </Menu>
      </Popover>
    </div>

    <div v-if="showPresets && normalizedPresets.length" :class="bem.e('presets')">
      <div
        v-for="preset in normalizedPresets"
        :key="preset.value"
        :class="[bem.e('preset'), bem.em('preset', 'active', preset.active)]"
        @click="onPresetSelect(preset.value)"
      >
        <div :class="bem.e('preset-fill')" :style="{ background: preset.preview }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, computed, ref, useTemplateRef, watch } from 'vue'
import {
  type ColorFormat,
  createBem,
  clamp,
  formatColor,
  getPreviewColor,
  hslToHsv,
  hslToRgb,
  hsvToHsl,
  normalizeHsva,
  parseColor,
  getTouchPoint,
  defaultColorPickerValue,
} from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import { usePointerDown } from '../../use'
import {
  type ColorPickerProps,
  type ColorPickerSlots,
  type ColorPickerEmits,
  type ColorPickerExpose,
  defaultColorPickerProps,
} from './common'
import Popover from '../popover/popover.vue'
import { Down, Up } from '@sard/icons'
import Menu from '../menu/menu.vue'
import MenuItem from '../menu/menu-item.vue'

const props = withDefaults(defineProps<ColorPickerProps>(), defaultColorPickerProps)

defineSlots<ColorPickerSlots>()

const emit = defineEmits<ColorPickerEmits>()

const bem = createBem('color-picker')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const getInitialHsvaColor = () => {
  const parsed = parseColor(props.modelValue || defaultColorPickerValue)
  return parsed ? normalizeHsva(hslToHsv(parsed.color)) : normalizeHsva(undefined)
}

const innerColor = ref(getInitialHsvaColor())
const lastEmittedValue = ref<string>()

watch(
  () => props.modelValue,
  (value) => {
    if (value === lastEmittedValue.value) {
      lastEmittedValue.value = undefined
      return
    }

    const parsed = parseColor(props.modelValue || defaultColorPickerValue)
    if (parsed) {
      innerColor.value = normalizeHsva(hslToHsv(parsed.color))
    }
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const currentColor = computed(() => {
  return hsvToHsl(innerColor.value)
})

const displayColor = computed(() => {
  return props.showAlpha
    ? currentColor.value
    : {
        ...currentColor.value,
        a: 1,
      }
})

const emitColor = () => {
  const value = formatColor(displayColor.value, currentFormat.value, props.showAlpha)
  lastEmittedValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

const applyColor = (nextColor: Partial<typeof innerColor.value>) => {
  innerColor.value = normalizeHsva({
    ...innerColor.value,
    ...nextColor,
  })
  emitColor()
}

const getTrackRect = (el: HTMLElement, rectRef: Ref<DOMRect | undefined>): DOMRect => {
  if (rectRef.value) {
    return rectRef.value
  }

  return (rectRef.value = el.getBoundingClientRect())
}

const clearTrackRect = (rectRef: Ref<DOMRect | undefined>) => {
  rectRef.value = undefined
}

const updateByHorizontalTrack = (
  event: TouchEvent,
  rectRef: Ref<DOMRect | undefined>,
  el: HTMLElement,
  callback: (ratio: number) => void,
) => {
  const rect = getTrackRect(el, rectRef)
  const { x } = getTouchPoint(event)
  const ratio = clamp((x - rect.left) / rect.width, 0, 1)
  callback(ratio)
}

// ============================ panel ============================
const panelRef = useTemplateRef('panel')
const panelRect = ref<DOMRect>()

const hueColor = computed(() => {
  return getPreviewColor(hsvToHsl({ h: innerColor.value.h, s: 100, v: 100, a: 1 }), false)
})

const panelStyle = computed(() => {
  return {
    background: `linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%), ${hueColor.value}`,
  }
})

const panelThumbStyle = computed(() => {
  return {
    left: `${innerColor.value.s}%`,
    top: `${100 - innerColor.value.v}%`,
  }
})

const updatePanelByEvent = (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const rect = getTrackRect(panelRef.value!, panelRect)
  const point = getTouchPoint(event)

  applyColor({
    s: clamp(((point.x - rect.left) / rect.width) * 100, 0, 100),
    v: clamp((1 - (point.y - rect.top) / rect.height) * 100, 0, 100),
  })
}

const onPanelTouchStart = (event: TouchEvent) => {
  void updatePanelByEvent(event)
}

const onPanelTouchMove = (event: TouchEvent) => {
  void updatePanelByEvent(event)
}

const onPanelTouchEnd = () => {
  clearTrackRect(panelRect)
}

const onPanelPointerDown = usePointerDown(onPanelTouchStart, onPanelTouchMove, onPanelTouchEnd)

// ============================ hue ============================
const hueBar = useTemplateRef('hueBar')
const hueRect = ref<DOMRect>()

const hueThumbStyle = computed(() => {
  return {
    left: `${(innerColor.value.h / 360) * 100}%`,
  }
})

const updateHueByEvent = (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  updateByHorizontalTrack(event, hueRect, hueBar.value!, (ratio) => {
    applyColor({
      h: ratio * 360,
    })
  })
}

const onHueTouchStart = (event: TouchEvent) => {
  void updateHueByEvent(event)
}

const onHueTouchMove = (event: TouchEvent) => {
  void updateHueByEvent(event)
}

const onHueTouchEnd = () => {
  clearTrackRect(hueRect)
}

const onHuePointerDown = usePointerDown(onHueTouchStart, onHueTouchMove, onHueTouchEnd)

// ============================ alpha ============================
const alphaBarRef = useTemplateRef('alphaBar')
const alphaRect = ref<DOMRect>()
const opaquePreviewRgb = computed(() => {
  return hslToRgb(hsvToHsl({ ...innerColor.value, a: 1 }))
})

const alphaBarStyle = computed(() => {
  const { r, g, b } = opaquePreviewRgb.value
  return {
    background: `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`,
  }
})

const alphaThumbStyle = computed(() => {
  return {
    left: `${innerColor.value.a * 100}%`,
  }
})

const updateAlphaByEvent = (event: TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  updateByHorizontalTrack(event, alphaRect, alphaBarRef.value!, (ratio) => {
    applyColor({
      a: ratio,
    })
  })
}

const onAlphaTouchStart = (event: TouchEvent) => {
  void updateAlphaByEvent(event)
}

const onAlphaTouchMove = (event: TouchEvent) => {
  void updateAlphaByEvent(event)
}

const onAlphaTouchEnd = () => {
  clearTrackRect(alphaRect)
}

const onAlphaPointerDown = usePointerDown(onAlphaTouchStart, onAlphaTouchMove, onAlphaTouchEnd)

// ============================ preview ============================
const colorFormats: ColorFormat[] = ['hex', 'rgb', 'hsl']
const formatOptions = colorFormats.map((format) => {
  return {
    label: format.toUpperCase(),
    value: format,
  }
})

const normalizeSelectableFormat = (format?: ColorFormat) => {
  return format && colorFormats.includes(format) ? format : 'hex'
}

const currentFormat = ref<ColorFormat>(normalizeSelectableFormat(props.format))

const displayFormat = computed(() => {
  return formatOptions.find((option) => option.value === currentFormat.value)?.label || ''
})

watch(
  () => props.format,
  () => {
    currentFormat.value = normalizeSelectableFormat(props.format)
  },
)

const onFormatSelect = ({ value }: { value: ColorFormat; label: string }) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  formatPopoverVisible.value = false

  if (currentFormat.value === value) return

  currentFormat.value = value
  emit('update:format', value)
  emit('format-change', value)
  emitColor()
}

const formatPopoverVisible = ref(false)

const outputValue = computed(() => {
  return formatColor(displayColor.value, currentFormat.value, props.showAlpha)
})

const previewColor = computed(() => {
  return getPreviewColor(displayColor.value, props.showAlpha)
})

const previewStyle = computed(() => {
  return {
    background: previewColor.value,
  }
})

// ============================ presets ============================
const normalizedPresets = computed(() => {
  return (props.presets || [])
    .map((value) => {
      const parsed = parseColor(value)
      if (!parsed) {
        return null
      }
      return {
        value,
        preview: getPreviewColor(parsed.color, props.showAlpha),
        active:
          formatColor(parsed.color, 'hex', props.showAlpha) ===
          formatColor(displayColor.value, 'hex', props.showAlpha),
      }
    })
    .filter(Boolean) as { value: string; preview: string; active: boolean }[]
})

const onPresetSelect = (value: string) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const parsed = parseColor(value)
  if (!parsed) {
    return
  }

  innerColor.value = normalizeHsva(hslToHsv(parsed.color))
  emitColor()
}

// ============================ others ============================
const colorPickerClass = computed(() => {
  return [bem.b(), bem.m('disabled', isDisabled.value), bem.m('readonly', isReadonly.value)]
})

defineExpose<ColorPickerExpose>({})
</script>
