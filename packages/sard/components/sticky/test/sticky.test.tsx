import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Sticky from '../sticky.vue'
import StickyBox from '../sticky-box.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

if (!globalThis.IntersectionObserver) {
  ;(globalThis as any).IntersectionObserver = IntersectionObserverMock
}

describe('Sticky', () => {
  test('basic', async () => {
    const wrapper = mount(<Sticky>内容</Sticky>)

    expect(wrapper.classes()).toContain('s-sticky')
    expect(wrapper.find('.s-sticky__fixation').exists()).toBe(true)
    expect(wrapper.find('.s-sticky__bound').text()).toBe('内容')
  })

  test('zIndex', async () => {
    const wrapper = mount(<Sticky zIndex={10}>内容</Sticky>)

    expect(wrapper.find('.s-sticky__fixation').attributes('style')).toContain('z-index: 10;')
  })

  test('StickyBox provides the sticky container context', async () => {
    const wrapper = mount(
      <StickyBox>
        <Sticky zIndex={10}>内容</Sticky>
      </StickyBox>,
    )

    expect(wrapper.find('.s-sticky-box').exists()).toBe(true)
    expect(wrapper.find('.s-sticky').exists()).toBe(true)
    expect(wrapper.find('.s-sticky__bound').text()).toBe('内容')
  })
})
