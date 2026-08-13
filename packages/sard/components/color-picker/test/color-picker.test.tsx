import { describe, expect, test, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import ColorPicker from '../color-picker.vue'
import Menu from '../../menu/menu.vue'

const selectFormat = async (
  wrapper: ReturnType<typeof mount>,
  payload: { value: 'hex' | 'rgb' | 'hsl'; label: string },
) => {
  const menu = wrapper.findComponent(Menu)
  menu.vm.$emit('select', payload)
  await nextTick()
}

const mockTrackRect = (rect: Partial<DOMRect> = {}) => {
  return vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () =>
      ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
        ...rect,
      }) as DOMRect,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ColorPicker', () => {
  // ==================== rendering ====================

  test('renders sv panel and hue slider by default', () => {
    const wrapper = mount(<ColorPicker />)

    expect(wrapper.find('.s-color-picker').exists()).toBe(true)
    expect(wrapper.find('.s-color-picker__panel').exists()).toBe(true)
    expect(wrapper.findAll('.s-color-picker__slider-bar')).toHaveLength(1)
    expect(wrapper.find('.s-color-picker__alpha-fill').exists()).toBe(false)
  })

  test('renders alpha slider when showAlpha is true', () => {
    const wrapper = mount(<ColorPicker showAlpha />)

    expect(wrapper.findAll('.s-color-picker__slider-bar')).toHaveLength(2)
    expect(wrapper.find('.s-color-picker__alpha-fill').exists()).toBe(true)
  })

  test('does not render format switcher when showFormat is false', () => {
    const wrapper = mount(<ColorPicker />)

    expect(wrapper.find('.s-color-picker__format').exists()).toBe(false)
  })

  test('renders format switcher when showFormat is true', () => {
    const wrapper = mount(<ColorPicker showFormat />)

    expect(wrapper.find('.s-color-picker__format').exists()).toBe(true)
    expect(wrapper.find('.s-color-picker__format').text()).toContain('RGB')
  })

  test('does not render presets when showPresets is false', () => {
    const wrapper = mount(<ColorPicker />)

    expect(wrapper.find('.s-color-picker__presets').exists()).toBe(false)
  })

  test('renders presets when showPresets is true', () => {
    const wrapper = mount(<ColorPicker showPresets />)

    expect(wrapper.find('.s-color-picker__presets').exists()).toBe(true)
    expect(wrapper.findAll('.s-color-picker__preset').length).toBeGreaterThan(0)
  })

  test('does not render presets section when presets array is empty', () => {
    const wrapper = mount(<ColorPicker showPresets presets={[]} />)

    expect(wrapper.find('.s-color-picker__presets').exists()).toBe(false)
  })

  // ==================== modelValue / default ====================

  test('uses default color when modelValue is empty', () => {
    const wrapper = mount(<ColorPicker modelValue="" />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(25, 137, 250)')
  })

  test('renders with initial modelValue', () => {
    const wrapper = mount(<ColorPicker modelValue="rgb(255, 0, 0)" />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(255, 0, 0)')
  })

  test('reacts to external modelValue change', async () => {
    const wrapper = mount(<ColorPicker modelValue="rgb(255, 0, 0)" />)

    await wrapper.setProps({ modelValue: 'rgb(0, 255, 0)' })

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(0, 255, 0)')
  })

  test('does not re-parse when receiving its own emitted value back', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    const emittedValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as string

    // Simulate parent syncing the value back
    await wrapper.setProps({ modelValue: emittedValue })

    // Should still display the emitted value without re-parsing from default
    expect(wrapper.find('.s-color-picker__value').text()).toContain(emittedValue)
  })

  // ==================== format ====================

  test('formats value as hex', () => {
    const wrapper = mount(<ColorPicker modelValue="rgb(255, 0, 0)" format="hex" />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('#FF0000')
  })

  test('formats value as hsl', () => {
    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="hsl" />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('hsl(0, 100%, 50%)')
  })

  test('preserves alpha channel when showAlpha is enabled', () => {
    const wrapper = mount(<ColorPicker modelValue="rgba(255, 0, 0, 0.5)" format="rgb" showAlpha />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgba(255, 0, 0, 0.5)')
  })

  test('strips alpha channel when showAlpha is disabled', () => {
    const wrapper = mount(<ColorPicker modelValue="rgba(255, 0, 0, 0.5)" format="rgb" />)

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(255, 0, 0)')
  })

  test('switches format via popover select', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat />)

    await selectFormat(wrapper, { value: 'rgb', label: 'RGB' })

    expect(wrapper.emitted('update:format')?.[0]).toEqual(['rgb'])
    expect(wrapper.emitted('format-change')?.[0]).toEqual(['rgb'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['rgb(255, 0, 0)'])
    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(255, 0, 0)')
  })

  test('does not emit when selecting the same format', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat />)

    await selectFormat(wrapper, { value: 'hex', label: 'HEX' })

    expect(wrapper.emitted('update:format')).toBeUndefined()
  })

  test('reacts to external format prop change', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat />)

    await wrapper.setProps({ format: 'rgb' })

    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(255, 0, 0)')
  })

  // ==================== presets ====================

  test('selects preset color', async () => {
    const wrapper = mount(<ColorPicker presets={['#00ff00']} showPresets />)

    await wrapper.find('.s-color-picker__preset').trigger('click')

    expect(wrapper.emitted('change')?.[0]).toEqual(['rgb(0, 255, 0)'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['rgb(0, 255, 0)'])
  })

  test('filters invalid presets', () => {
    const wrapper = mount(
      <ColorPicker modelValue="#00FF00" presets={['invalid', '#00FF00', '#FF0000']} showPresets />,
    )

    const presets = wrapper.findAll('.s-color-picker__preset')
    expect(presets).toHaveLength(2)
  })

  test('marks current preset as active', () => {
    const wrapper = mount(
      <ColorPicker modelValue="#00FF00" presets={['#00FF00', '#FF0000']} showPresets />,
    )

    const presets = wrapper.findAll('.s-color-picker__preset')
    expect(presets[0].attributes('class')).toContain('active')
    expect(presets[1].attributes('class')).not.toContain('active')
  })

  test('updates active preset when modelValue changes', async () => {
    const wrapper = mount(
      <ColorPicker modelValue="#00FF00" presets={['#00FF00', '#FF0000']} showPresets />,
    )

    await wrapper.setProps({ modelValue: '#FF0000' })

    const presets = wrapper.findAll('.s-color-picker__preset')
    expect(presets[1].attributes('class')).toContain('active')
  })

  test('uses default presets when presets prop is not provided', () => {
    const wrapper = mount(<ColorPicker showPresets />)

    // Default presets should render some preset items
    expect(wrapper.findAll('.s-color-picker__preset').length).toBeGreaterThan(0)
  })

  // ==================== hue slider interaction ====================

  test('updates color when dragging hue slider', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['rgb(0, 255, 255)'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['rgb(0, 255, 255)'])
  })

  test('updates color when dragging hue slider via touchmove', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 10, clientY: 0 }],
      changedTouches: [{ clientX: 10, clientY: 0 }],
    })
    await nextTick()

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchmove', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.length).toBe(2)
  })

  test('keeps hue thumb stable after sv drag and external model sync', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="hsl(120, 100%, 50%)" format="hsl" />)

    const hueThumb = wrapper.findAll('.s-color-picker__thumb')[1]
    const beforeStyle = hueThumb.attributes('style')

    await wrapper.find('.s-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 80 }],
      changedTouches: [{ clientX: 20, clientY: 80 }],
    })
    await nextTick()

    const emittedEvents = wrapper.emitted() as Record<string, string[][] | undefined>
    const emittedValue = emittedEvents['update:modelValue']?.[0]?.[0]
    expect(emittedValue).toBeTruthy()

    await wrapper.setProps({ modelValue: emittedValue })
    await nextTick()

    expect(wrapper.findAll('.s-color-picker__thumb')[1].attributes('style')).toBe(beforeStyle)
  })

  // ==================== sv panel interaction ====================

  test('updates color when dragging sv panel', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    await wrapper.find('.s-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 80 }],
      changedTouches: [{ clientX: 20, clientY: 80 }],
    })
    await nextTick()

    const emittedValue = wrapper.emitted('update:modelValue')?.[0]?.[0]
    expect(emittedValue).toBeTruthy()
    expect(emittedValue).not.toBe('rgb(255, 0, 0)')
  })

  test('clamps sv panel values to 0-100 range', async () => {
    mockTrackRect({ left: 0, top: 0, width: 100, height: 100 })

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    // Drag beyond left edge
    await wrapper.find('.s-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: -10, clientY: 50 }],
      changedTouches: [{ clientX: -10, clientY: 50 }],
    })
    await nextTick()

    const value1 = wrapper.emitted('update:modelValue')?.[0]?.[0] as string
    expect(value1).toBeTruthy()
  })

  // ==================== alpha slider interaction ====================

  test('updates alpha when dragging alpha slider', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="rgba(255, 0, 0, 0.5)" format="rgb" showAlpha />)

    const alphaBar = wrapper.findAll('.s-color-picker__slider-bar')[1]
    await alphaBar.trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 0 }],
      changedTouches: [{ clientX: 20, clientY: 0 }],
    })
    await nextTick()

    const emittedValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as string
    expect(emittedValue).toContain('0.2')
  })

  // ==================== disabled state ====================

  test('does not react to preset selection when disabled', async () => {
    const wrapper = mount(
      <ColorPicker
        modelValue="#ff0000"
        format="hex"
        showFormat
        presets={['#00ff00']}
        showPresets
        disabled
      />,
    )

    await wrapper.find('.s-color-picker__preset').trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('does not react to format selection when disabled', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat disabled />)

    await selectFormat(wrapper, { value: 'rgb', label: 'RGB' })

    expect(wrapper.emitted('update:format')).toBeUndefined()
    expect(wrapper.find('.s-color-picker__value').text()).toContain('#FF0000')
  })

  test('does not react to panel drag when disabled', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" disabled />)

    await wrapper.find('.s-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 80 }],
      changedTouches: [{ clientX: 20, clientY: 80 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('does not react to hue drag when disabled', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" disabled />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('does not react to alpha drag when disabled', async () => {
    mockTrackRect()

    const wrapper = mount(
      <ColorPicker modelValue="rgba(255, 0, 0, 0.5)" format="rgb" showAlpha disabled />,
    )

    await wrapper.findAll('.s-color-picker__slider-bar')[1].trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 0 }],
      changedTouches: [{ clientX: 20, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  // ==================== readonly state ====================

  test('does not react to panel drag when readonly', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" readonly />)

    await wrapper.find('.s-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 80 }],
      changedTouches: [{ clientX: 20, clientY: 80 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('does not react to hue drag when readonly', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" readonly />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('does not react to preset selection when readonly', async () => {
    const wrapper = mount(
      <ColorPicker modelValue="#ff0000" presets={['#00ff00']} showPresets readonly />,
    )

    await wrapper.find('.s-color-picker__preset').trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('does not react to format selection when readonly', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat readonly />)

    await selectFormat(wrapper, { value: 'rgb', label: 'RGB' })

    expect(wrapper.emitted('update:format')).toBeUndefined()
  })

  // ==================== preview / styles ====================

  test('renders preview fill with correct background', () => {
    const wrapper = mount(<ColorPicker modelValue="rgb(255, 0, 0)" />)

    const previewFill = wrapper.find('.s-color-picker__preview-fill')
    expect(previewFill.exists()).toBe(true)
    expect(previewFill.attributes('style')).toContain('background')
  })

  test('renders panel with hue-based gradient background', () => {
    const wrapper = mount(<ColorPicker modelValue="#FF0000" />)

    const panel = wrapper.find('.s-color-picker__panel')
    expect(panel.attributes('style')).toContain('background')
  })

  test('positions panel thumb based on saturation and value', () => {
    const wrapper = mount(<ColorPicker modelValue="rgb(255, 0, 0)" />)

    const panelThumb = wrapper.findAll('.s-color-picker__thumb')[0]
    const style = panelThumb.attributes('style')
    expect(style).toContain('left')
    expect(style).toContain('top')
  })

  test('positions hue thumb based on hue value', () => {
    const wrapper = mount(<ColorPicker modelValue="#FF0000" />)

    const hueThumb = wrapper.findAll('.s-color-picker__thumb')[1]
    const style = hueThumb.attributes('style')
    expect(style).toContain('left')
    expect(style).toContain('0%')
  })

  // ==================== events ====================

  test('emits change event when color is modified', async () => {
    mockTrackRect()

    const wrapper = mount(<ColorPicker modelValue="#FF0000" format="rgb" />)

    await wrapper.findAll('.s-color-picker__slider-bar')[0].trigger('touchstart', {
      touches: [{ clientX: 50, clientY: 0 }],
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    await nextTick()

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('emits both update:format and format-change on format switch', async () => {
    const wrapper = mount(<ColorPicker modelValue="#ff0000" format="hex" showFormat />)

    await selectFormat(wrapper, { value: 'rgb', label: 'RGB' })

    expect(wrapper.emitted('update:format')?.[0]).toEqual(['rgb'])
    expect(wrapper.emitted('format-change')?.[0]).toEqual(['rgb'])
  })

  test('emits correct value when selecting preset', async () => {
    const wrapper = mount(<ColorPicker presets={['#ff00ff']} showPresets format="hex" />)

    await wrapper.find('.s-color-picker__preset').trigger('click')

    expect(wrapper.emitted('change')?.[0]).toEqual(['#FF00FF'])
  })

  // ==================== edge cases ====================

  test('handles undefined modelValue gracefully', () => {
    const wrapper = mount(<ColorPicker modelValue={undefined as never} />)

    expect(wrapper.find('.s-color-picker').exists()).toBe(true)
    expect(wrapper.find('.s-color-picker__value').text()).toContain('rgb(25, 137, 250)')
  })

  test('handles invalid color string gracefully', () => {
    const wrapper = mount(<ColorPicker modelValue="not-a-color" />)

    expect(wrapper.find('.s-color-picker').exists()).toBe(true)
  })

  test('handles presets with all invalid values', () => {
    const wrapper = mount(<ColorPicker presets={['invalid1', 'invalid2']} showPresets />)

    // Should not render any presets since all are invalid
    expect(wrapper.find('.s-color-picker__presets').exists()).toBe(false)
  })
})
