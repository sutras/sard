import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import BackTop from '../back-top.vue'

describe('BackTop', () => {
  test('position', async () => {
    const wrapper = mount(<BackTop right="100px" bottom="100px" />)

    expect(wrapper.attributes('style')).toContain('inset-inline-end: 100px;')
    expect(wrapper.attributes('style')).toContain('bottom: 100px;')
  })

  test('scrollTop', async () => {
    const wrapper = mount(<BackTop scrollTop={0} />)

    expect(wrapper.classes()).not.toContain('s-back-top--visible')

    await wrapper.setProps({ scrollTop: 300 })

    expect(wrapper.classes()).toContain('s-back-top--visible')
  })

  test('visibleHeight', async () => {
    const wrapper = mount(<BackTop visibleHeight={200} />)

    expect(wrapper.classes()).not.toContain('s-back-top--visible')

    await wrapper.setProps({ visibleHeight: 0 })

    expect(wrapper.classes()).toContain('s-back-top--visible')
  })

  test('slot', async () => {
    const wrapper = mount(<BackTop>回到顶部</BackTop>)

    expect(wrapper.text()).toBe('回到顶部')
  })

  test('click', async () => {
    const wrapper = mount(<BackTop />)

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
