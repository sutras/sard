import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import ColorPickerInput from '../color-picker-input.vue'
import ColorPickerPopout from '../../color-picker-popout/color-picker-popout.vue'
import PopoutInput from '../../popout-input/popout-input.vue'

describe('ColorPickerInput', () => {
  const getInputValue = (wrapper: ReturnType<typeof mount>) =>
    (wrapper.find('.s-input input').element as HTMLInputElement).value

  // ==================== rendering ====================

  test('renders input with modelValue', () => {
    const wrapper = mount(
      <ColorPickerInput title="请选择颜色" placeholder="请选择颜色" modelValue="#ff0000" />,
    )

    expect(getInputValue(wrapper)).toBe('#ff0000')
    expect(wrapper.find('.s-color-picker-input__preview').exists()).toBe(true)
  })

  test('renders preview fill with correct background', () => {
    const wrapper = mount(<ColorPickerInput modelValue="rgb(255, 0, 0)" />)

    const style = wrapper.find('.s-color-picker-input__preview-fill').attributes('style')
    expect(style).toContain('rgb(255, 0, 0)')
  })

  test('renders placeholder', () => {
    const wrapper = mount(<ColorPickerInput placeholder="请选择颜色" />)

    expect(wrapper.find('.s-input input').attributes('placeholder')).toBe('请选择颜色')
  })

  test('popout is not visible by default', () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    expect(wrapper.findComponent(ColorPickerPopout).props('visible')).toBe(false)
  })

  // ==================== modelValue ====================

  test('syncs input value when modelValue changes', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    await wrapper.setProps({ modelValue: '#00ff00' })

    expect(getInputValue(wrapper)).toBe('#00ff00')
  })

  test('updates preview when modelValue changes', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    const getPreviewStyle = () =>
      wrapper.find('.s-color-picker-input__preview-fill').attributes('style')

    expect(getPreviewStyle()).toContain('rgb(255, 0, 0)')

    await wrapper.setProps({ modelValue: '#00ff00' })

    expect(getPreviewStyle()).toContain('rgb(0, 255, 0)')
  })

  test('clears input when modelValue is undefined', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    await wrapper.setProps({ modelValue: undefined })

    expect(getInputValue(wrapper)).toBe('')
  })

  test('clears input when modelValue is empty string', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    await wrapper.setProps({ modelValue: '' })

    expect(getInputValue(wrapper)).toBe('')
  })

  // ==================== visible ====================

  test('controls popout visibility via visible prop', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    await wrapper.setProps({ visible: true })
    expect(wrapper.findComponent(ColorPickerPopout).props('visible')).toBe(true)

    await wrapper.setProps({ visible: false })
    expect(wrapper.findComponent(ColorPickerPopout).props('visible')).toBe(false)
  })

  test('opens popout on input click', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    await wrapper.find('.s-popout-input__seal').trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
  })

  // ==================== clear ====================

  test('emits update:modelValue and change with undefined on clear', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" clearable />)

    await wrapper.findComponent(PopoutInput).vm.$emit('clear')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined])
    expect(wrapper.emitted('change')?.[0]).toEqual([undefined])
  })

  test('emits update:modelValue and change with valueOnClear on clear', async () => {
    const valueOnClear = () => '#000000'
    const wrapper = mount(
      <ColorPickerInput modelValue="#ff0000" clearable valueOnClear={valueOnClear} />,
    )

    await wrapper.findComponent(PopoutInput).vm.$emit('clear')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#000000'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['#000000'])
  })

  test('clears input text on clear', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" clearable />)

    await wrapper.findComponent(PopoutInput).vm.$emit('clear')
    await nextTick()

    expect(getInputValue(wrapper)).toBe('')
  })

  // ==================== disabled / readonly ====================

  test('passes disabled to PopoutInput', () => {
    const wrapper = mount(<ColorPickerInput disabled />)

    expect(wrapper.findComponent(PopoutInput).props('disabled')).toBe(true)
  })

  test('passes readonly to PopoutInput', () => {
    const wrapper = mount(<ColorPickerInput readonly />)

    expect(wrapper.findComponent(PopoutInput).props('readonly')).toBe(true)
  })

  // ==================== props passthrough to ColorPickerPopout ====================

  test('passes format to ColorPickerPopout', () => {
    const wrapper = mount(<ColorPickerInput format="hex" />)

    expect(wrapper.findComponent(ColorPickerPopout).props('format')).toBe('hex')
  })

  test('passes showAlpha to ColorPickerPopout', () => {
    const wrapper = mount(<ColorPickerInput showAlpha />)

    expect(wrapper.findComponent(ColorPickerPopout).props('showAlpha')).toBe(true)
  })

  test('passes showFormat to ColorPickerPopout', () => {
    const wrapper = mount(<ColorPickerInput showFormat />)

    expect(wrapper.findComponent(ColorPickerPopout).props('showFormat')).toBe(true)
  })

  test('passes presets to ColorPickerPopout', () => {
    const presets = ['#ff0000', '#00ff00']
    const wrapper = mount(<ColorPickerInput presets={presets} />)

    expect(wrapper.findComponent(ColorPickerPopout).props('presets')).toEqual(presets)
  })

  test('passes showPresets to ColorPickerPopout', () => {
    const wrapper = mount(<ColorPickerInput showPresets />)

    expect(wrapper.findComponent(ColorPickerPopout).props('showPresets')).toBe(true)
  })

  test('passes title to ColorPickerPopout (fallback to placeholder)', () => {
    const wrapper = mount(<ColorPickerInput title="选择颜色" placeholder="请选择" />)

    expect(wrapper.findComponent(ColorPickerPopout).props('title')).toBe('选择颜色')
  })

  test('uses placeholder as title when title not provided', () => {
    const wrapper = mount(<ColorPickerInput placeholder="请选择颜色" />)

    expect(wrapper.findComponent(ColorPickerPopout).props('title')).toBe('请选择颜色')
  })

  // ==================== events ====================

  test('emits confirm when popout confirms', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    wrapper.findComponent(ColorPickerPopout).vm.$emit('confirm')
    await nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('emits update:modelValue and change when popout changes value', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    wrapper.findComponent(ColorPickerPopout).vm.$emit('change', '#00FF00')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#00FF00'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['#00FF00'])
  })

  test('emits visible-hook from popout', async () => {
    const wrapper = mount(<ColorPickerInput modelValue="#ff0000" />)

    wrapper.findComponent(ColorPickerPopout).vm.$emit('visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.emitted('visible-hook')?.[0]).toEqual(['after-leave', undefined])
  })

  // ==================== edge cases ====================

  test('handles mounting without modelValue', () => {
    const wrapper = mount(<ColorPickerInput />)

    expect(wrapper.find('.s-color-picker-input').exists()).toBe(true)
    expect(getInputValue(wrapper)).toBe('')
  })
})
