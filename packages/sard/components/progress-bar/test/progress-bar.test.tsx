import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ProgressBar from '../progress-bar.vue'

describe('ProgressBar', () => {
  test('basic', async () => {
    const wrapper = mount(<ProgressBar percent={50} />)

    expect(wrapper.find('.s-progress-bar__fill').attributes('style')).toContain('width: 50%;')
    expect(wrapper.find('.s-progress-bar__text').text()).toBe('50%')
  })

  test('showText', async () => {
    const wrapper = mount(<ProgressBar percent={50} showText={false} />)

    expect(wrapper.find('.s-progress-bar__text').exists()).toBe(false)
  })

  test('thickness', async () => {
    const wrapper = mount(<ProgressBar percent={50} thickness="20px" />)

    expect(wrapper.find('.s-progress-bar__track').attributes('style')).toContain('height: 20px;')
  })

  test('color', async () => {
    const wrapper = mount(<ProgressBar percent={50} color="red" />)

    expect(wrapper.find('.s-progress-bar__fill').attributes('style')).toContain(
      'background-color: red;',
    )
  })

  test('striped', async () => {
    const wrapper = mount(<ProgressBar percent={50} striped />)

    expect(wrapper.classes()).toContain('s-progress-bar--striped')
  })

  test('status renders status icon classes and hides text', async () => {
    const wrapper = mount(<ProgressBar percent={50} status="success" />)

    expect(wrapper.classes()).toContain('s-progress-bar--success')
    expect(wrapper.find('.s-progress-bar__status svg').exists()).toBe(true)
    expect(wrapper.find('.s-progress-bar__text').exists()).toBe(false)

    await wrapper.setProps({ status: 'warning' })
    expect(wrapper.classes()).toContain('s-progress-bar--warning')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.classes()).toContain('s-progress-bar--error')
  })
})
