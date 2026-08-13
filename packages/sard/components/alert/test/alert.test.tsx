import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Alert from '../../alert/alert.vue'

describe('Alert', () => {
  test('basic', async () => {
    const wrapper = mount(<Alert>这是警告提示</Alert>)

    expect(wrapper.find('.s-alert').text()).toBe('这是警告提示')
    expect(wrapper.classes()).toContain('s-alert--primary')
  })

  test('type', async () => {
    const wrapper = mount(<Alert>这是警告提示</Alert>)

    expect(wrapper.classes()).toContain('s-alert--primary')

    await wrapper.setProps({
      type: 'success',
    })
    expect(wrapper.classes()).toContain('s-alert--success')

    await wrapper.setProps({
      type: 'warning',
    })
    expect(wrapper.classes()).toContain('s-alert--warning')

    await wrapper.setProps({
      type: 'danger',
    })
    expect(wrapper.classes()).toContain('s-alert--danger')

    await wrapper.setProps({
      type: 'primary',
    })
    expect(wrapper.classes()).toContain('s-alert--primary')
  })

  test('color', async () => {
    const wrapper = mount(
      <Alert color="red" background="green">
        这是警告提示
      </Alert>,
    )

    const style = wrapper.attributes('style')

    expect(style).toContain('color: red;')
    expect(style).toContain('background: green;')
  })

  test('showIcon', async () => {
    const wrapper = mount(<Alert showIcon>这是警告提示</Alert>)

    expect(wrapper.find('.s-alert__icon').exists()).toBe(true)
  })

  test('closable', async () => {
    const wrapper = mount(<Alert closable>这是警告提示</Alert>)

    expect(wrapper.find('.s-alert__close').exists()).toBe(true)

    await wrapper.find('.s-alert__close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('.s-alert').exists()).toBe(false)
  })

  test('square', async () => {
    const wrapper = mount(<Alert square>这是警告提示</Alert>)

    expect(wrapper.classes()).toContain('s-alert--square')
  })
})
