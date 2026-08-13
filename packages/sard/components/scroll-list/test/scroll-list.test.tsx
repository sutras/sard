import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ScrollList from '../scroll-list.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

describe('ScrollList', () => {
  test('renders wrapper slot content and scrollbar structure by default', async () => {
    const wrapper = mount(
      <ScrollList>
        <div class="content">内容</div>
      </ScrollList>,
    )

    expect(wrapper.find('.s-scroll-list__wrapper .content').text()).toBe('内容')
    expect(wrapper.find('.s-scroll-list__scroll').exists()).toBe(true)
    expect(wrapper.find('.s-scroll-list__scrollbar').exists()).toBe(true)
    expect(wrapper.find('.s-scroll-list__scrollbar-thumb').exists()).toBe(true)
  })

  test('applies custom scrollbar and thumb colors to inline styles', async () => {
    const wrapper = mount(
      <ScrollList scrollbarBg="red" thumbBg="blue">
        <div>内容</div>
      </ScrollList>,
    )

    expect(wrapper.find('.s-scroll-list__scrollbar').attributes('style')).toContain(
      'background-color: red;',
    )
    expect(wrapper.find('.s-scroll-list__scrollbar-thumb').attributes('style')).toContain(
      'background-color: blue;',
    )
  })
})
