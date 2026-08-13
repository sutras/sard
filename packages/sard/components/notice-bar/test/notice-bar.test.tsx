import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import NoticeBar from '../notice-bar.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

describe('NoticeBar', () => {
  test('basic', async () => {
    const wrapper = mount(<NoticeBar>这是一条公告！</NoticeBar>)

    expect(wrapper.find('.s-notice-bar__left-icon svg').exists()).toBe(true)
    expect(wrapper.find('.s-notice-bar__content .s-notice-bar__wrapper').text()).toBe(
      '这是一条公告！',
    )
  })

  test('wrap', async () => {
    const wrapper = mount(<NoticeBar wrap>这是一条公告！</NoticeBar>)

    expect(wrapper.classes()).toContain('s-notice-bar--wrap')
  })

  test('hideLeftIcon', async () => {
    const wrapper = mount(<NoticeBar hideLeftIcon>这是一条公告！</NoticeBar>)

    expect(wrapper.find('.s-notice-bar__left-icon').exists()).toBe(false)
  })

  test('leftIconSlot', async () => {
    const wrapper = mount(
      <NoticeBar
        v-slots={{
          'left-icon': () => 'left-icon',
        }}
      />,
    )

    expect(wrapper.find('.s-notice-bar__left-icon').text()).toBe('left-icon')
  })

  test('closable', async () => {
    const wrapper = mount(<NoticeBar closable />)

    expect(wrapper.find('.s-notice-bar__right-icon svg').exists()).toBe(true)

    await wrapper.find('.s-notice-bar__right-icon').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.attributes('style')).toContain('display: none;')
  })

  test('linkable', async () => {
    const wrapper = mount(<NoticeBar linkable />)

    expect(wrapper.classes()).toContain('s-notice-bar--linkable')
    expect(wrapper.find('.s-notice-bar__right-icon svg').exists()).toBe(true)
  })

  test('rightIconSlot', async () => {
    const wrapper = mount(
      <NoticeBar
        closable
        v-slots={{
          'right-icon': () => 'right-icon',
        }}
      />,
    )

    expect(wrapper.find('.s-notice-bar__right-icon').text()).toBe('right-icon')
  })

  test('style', async () => {
    const wrapper = mount(<NoticeBar color="red" background="blue" />)

    expect(wrapper.attributes('style')).toContain('color: red;')
    expect(wrapper.attributes('style')).toContain('background: blue;')
  })

  test('vertical', async () => {
    const wrapper = mount(<NoticeBar vertical />)

    expect(wrapper.classes()).toContain('s-notice-bar--vertical')
  })
})
