import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Slider from '../slider.vue'

describe('Slider', () => {
  test('basic', async () => {
    const wrapper = mount(<Slider modelValue={50} />)

    expect(wrapper.find('.s-slider__fill').attributes('style')).toContain('width: 50%;')
  })

  test('range', async () => {
    const wrapper = mount(<Slider modelValue={[20, 80]} range />)

    const style = wrapper.find('.s-slider__fill').attributes('style')

    expect(style).toContain('inset-inline-start: 20%;')
    expect(style).toContain('width: 60.00000000000001%;')
  })

  test('showValue', async () => {
    const wrapper = mount(<Slider modelValue={50} showValue />)

    expect(wrapper.find('.s-slider__value').text()).toBe('50')

    await wrapper.setProps({
      modelValue: [20, 80],
      range: true,
    })

    expect(wrapper.find('.s-slider__thumb-container--start .s-slider__value').text()).toBe('20')
    expect(wrapper.find('.s-slider__thumb-container--end .s-slider__value').text()).toBe('80')
  })

  test('fill percent respects min and max', async () => {
    const min = -50
    const max = 23
    const value = 49
    const width = ((value - min) / (max - min)) * 100

    const wrapper = mount(<Slider min={min} max={max} modelValue={value} />)

    expect(wrapper.find('.s-slider__fill').attributes('style')).toContain(`width: ${width}%`)
  })

  test('vertical', async () => {
    const wrapper = mount(<Slider modelValue={50} vertical />)

    expect(wrapper.classes()).toContain('s-slider--vertical')
  })

  test('showScale', async () => {
    const wrapper = mount(<Slider modelValue={50} showScale step={20} />)

    const result = '0,20,40,60,80,100'

    expect(
      wrapper
        .findAll('.s-slider__scale-text')
        .map((item) => item.text())
        .join(','),
    ).toBe(result)
  })

  test('color', async () => {
    const wrapper = mount(<Slider modelValue={50} color="red" thumbColor="blue" />)

    expect(wrapper.find('.s-slider__fill').attributes('style')).toContain('background-color: red;')
    expect(wrapper.find('.s-slider__thumb').attributes('style')).toContain(
      'background-color: blue;',
    )
  })

  test('size', async () => {
    const wrapper = mount(<Slider modelValue={50} thumbSize="48px" trackSize="20px" />)

    expect(wrapper.find('.s-slider__track').attributes('style')).toContain('height: 20px;')
    expect(wrapper.find('.s-slider__thumb').attributes('style')).toContain('width: 48px;')
    expect(wrapper.find('.s-slider__thumb').attributes('style')).toContain('height: 48px;')
  })

  test('readonly', async () => {
    const wrapper = mount(<Slider modelValue={50} readonly />)

    expect(wrapper.classes()).toContain('s-slider--readonly')
  })

  test('disabled', async () => {
    const wrapper = mount(<Slider modelValue={50} disabled />)

    expect(wrapper.classes()).toContain('s-slider--disabled')
  })

  test('slot', async () => {
    const wrapper = mount(
      <Slider
        modelValue={50}
        v-slots={{
          'end-thumb': ({ value }: { value: number }) => <div class="content">{value}</div>,
        }}
      />,
    )

    expect(wrapper.find('.s-slider__thumb-container--end .content').text()).toBe('50')
  })
})
