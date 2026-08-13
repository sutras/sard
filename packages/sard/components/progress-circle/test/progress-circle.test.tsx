import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ProgressCircle from '../progress-circle.vue'

describe('ProgressCircle', () => {
  test('basic', async () => {
    const wrapper = mount(<ProgressCircle percent={50} />)

    expect(wrapper.find('.s-progress-circle__text').text()).toBe('50%')
  })

  test('thickness', async () => {
    const wrapper = mount(<ProgressCircle percent={50} thickness={30} />)

    expect(wrapper.find('.s-progress-circle__track').attributes('stroke-width')).toBe('30')
    expect(wrapper.find('.s-progress-circle__fill').attributes('stroke-width')).toBe('30')
  })

  test('color', async () => {
    const wrapper = mount(<ProgressCircle percent={50} color="red" />)

    expect(wrapper.find('.s-progress-circle__fill').attributes('style')).toContain('stroke: red;')
  })

  test('size', async () => {
    const wrapper = mount(<ProgressCircle percent={50} size="144px" />)

    expect(wrapper.attributes('style')).toContain('width: 144px;')
    expect(wrapper.attributes('style')).toContain('height: 144px;')
  })

  test('status renders status icon classes and hides text', async () => {
    const wrapper = mount(<ProgressCircle percent={50} status="success" />)

    expect(wrapper.classes()).toContain('s-progress-circle--success')
    expect(wrapper.find('.s-progress-circle__status svg').exists()).toBe(true)
    expect(wrapper.find('.s-progress-circle__text').exists()).toBe(false)

    await wrapper.setProps({ status: 'warning' })
    expect(wrapper.classes()).toContain('s-progress-circle--warning')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.classes()).toContain('s-progress-circle--error')
  })
})
