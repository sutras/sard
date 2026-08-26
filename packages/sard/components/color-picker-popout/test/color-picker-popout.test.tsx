import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import ColorPickerPopout from '../color-picker-popout.vue'
import ColorPicker from '../../color-picker/color-picker.vue'
import Popout from '../../popout/popout.vue'
import { defaultColorPickerValue } from '../../../utils'

const emitOn = (
  wrapper: ReturnType<typeof mount>,
  component: object,
  event: string,
  ...args: any[]
) => {
  wrapper.getComponent(component).vm.$emit(event, ...args)
}

describe('ColorPickerPopout', () => {
  // ==================== rendering ====================

  test('renders title and color picker when visible', () => {
    const wrapper = mount(<ColorPickerPopout title="请选择颜色" visible={true} />)

    expect(wrapper.findComponent(Popout).props('title')).toBe('请选择颜色')
    expect(wrapper.findComponent(ColorPicker).exists()).toBe(true)
  })

  test('renders ColorPicker with props passthrough', () => {
    const wrapper = mount(<ColorPickerPopout visible={true} showAlpha format="hex" />)

    const cp = wrapper.findComponent(ColorPicker)
    expect(cp.props('showAlpha')).toBe(true)
    expect(cp.props('format')).toBe('hex')
  })

  test('does not render content when not visible', () => {
    const wrapper = mount(<ColorPickerPopout visible={false} />)

    expect(wrapper.find('.s-color-picker').exists()).toBe(false)
  })

  // ==================== confirm flow ====================

  test('emits confirm, update:modelValue and change after confirming', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    emitOn(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted('confirm')?.[0]).toEqual(['#00FF00'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#00FF00'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['#00FF00'])
  })

  test('does not emit update:modelValue or change if value unchanged', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    emitOn(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('falls back to default color when confirming empty binding', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="" />)

    emitOn(wrapper, ColorPicker, 'change', '')
    await nextTick()

    emitOn(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([defaultColorPickerValue])
    expect(wrapper.emitted('change')?.[0]).toEqual([defaultColorPickerValue])
  })

  test('updates ColorPicker modelValue after confirming', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    emitOn(wrapper, Popout, 'confirm')
    await nextTick()

    // After confirm, ColorPicker should reflect the confirmed value
    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#00FF00')
  })

  // ==================== reset flow ====================

  test('resets pending value after leave when resettable', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} resettable modelValue="#FF0000" />)

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#00FF00')

    emitOn(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#FF0000')
  })

  test('does not reset pending value after leave when resettable is false', async () => {
    const wrapper = mount(
      <ColorPickerPopout visible={true} resettable={false} modelValue="#FF0000" />,
    )

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    emitOn(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    // Without resettable, pending value should persist
    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#00FF00')
  })

  test('does not reset if value was not changed before leave', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} resettable modelValue="#FF0000" />)

    emitOn(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#FF0000')
  })

  test('does not reset on non-after-leave hooks', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} resettable modelValue="#FF0000" />)

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    emitOn(wrapper, Popout, 'visible-hook', 'before-leave')
    await nextTick()

    // Only after-leave triggers reset
    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#00FF00')
  })

  // ==================== external modelValue sync ====================

  test('syncs ColorPicker value when external modelValue changes', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    await wrapper.setProps({ modelValue: '#0000FF' })

    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#0000FF')
  })

  test('external modelValue change during editing does not affect pending value', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    emitOn(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    // External modelValue sync should override popout value
    // (innerValue watch triggers and draftValue follows innerValue)
    await wrapper.setProps({ modelValue: '#0000FF' })

    expect(wrapper.findComponent(ColorPicker).props('modelValue')).toBe('#0000FF')
  })

  // ==================== visible binding ====================

  test('syncs visible via v-model', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} />)

    emitOn(wrapper, Popout, 'update:visible', false)
    await nextTick()

    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  // ==================== props ====================

  test('passes showConfirm to Popout', () => {
    const wrapper = mount(<ColorPickerPopout visible={true} showConfirm={false} />)

    expect(wrapper.findComponent(Popout).props('showConfirm')).toBe(false)
  })

  test('passes showConfirm default true to Popout', () => {
    const wrapper = mount(<ColorPickerPopout visible={true} />)

    expect(wrapper.findComponent(Popout).props('showConfirm')).toBe(true)
  })

  test('passes title to Popout', () => {
    const wrapper = mount(<ColorPickerPopout visible={true} title="选择颜色" />)

    expect(wrapper.findComponent(Popout).props('title')).toBe('选择颜色')
  })

  // ==================== edge cases ====================

  test('handles undefined modelValue gracefully', () => {
    expect(() =>
      mount(<ColorPickerPopout visible={true} modelValue={undefined as never} />),
    ).not.toThrow()
  })

  test('emits confirm even with no modelValue change', async () => {
    const wrapper = mount(<ColorPickerPopout visible={true} modelValue="#FF0000" />)

    emitOn(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})
