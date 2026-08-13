import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import Divider from '../divider.vue'

describe('Divider', () => {
  test('basic', async () => {
    const wrapper = mount(<Divider />)

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        's-divider',
        's-divider--center',
        's-divider--hairline',
        's-divider--only-line',
      ]),
    )
    expect(wrapper.attributes('style')).toContain('border-style: solid;')
  })

  test('renders slot content and removes only-line modifier', async () => {
    const wrapper = mount(<Divider>分割线</Divider>)

    expect(wrapper.text()).toBe('分割线')
    expect(wrapper.classes()).not.toContain('s-divider--only-line')
  })

  test('position', async () => {
    const wrapper = mount(<Divider position="left">分割线</Divider>)

    expect(wrapper.classes()).toContain('s-divider--left')

    await wrapper.setProps({ position: 'right' })

    expect(wrapper.classes()).toContain('s-divider--right')
    expect(wrapper.classes()).not.toContain('s-divider--left')
  })

  test('type', async () => {
    const wrapper = mount(<Divider>分割线</Divider>)

    expect(wrapper.attributes('style')).toContain('border-style: solid;')

    await wrapper.setProps({ type: 'dashed' })
    expect(wrapper.attributes('style')).toContain('border-style: dashed;')

    await wrapper.setProps({ type: 'dotted' })
    expect(wrapper.attributes('style')).toContain('border-style: dotted;')
  })

  test('vertical', async () => {
    const wrapper = mount(<Divider vertical>分割线</Divider>)

    expect(wrapper.classes()).toContain('s-divider--vertical')
  })

  test('hairline', async () => {
    const wrapper = mount(<Divider>分割线</Divider>)

    expect(wrapper.classes()).toContain('s-divider--hairline')

    await wrapper.setProps({ hairline: false })

    expect(wrapper.classes()).not.toContain('s-divider--hairline')
  })
})
