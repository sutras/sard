import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Navbar from '../navbar.vue'
import NavbarItem from '../navbar-item.vue'

describe('Navbar', () => {
  test('basic', async () => {
    const wrapper = mount(<Navbar title="标题" />)

    expect(wrapper.find('.s-navbar__title').text()).toBe('标题')
  })

  test('item', async () => {
    const wrapper = mount(
      <Navbar
        title="标题"
        v-slots={{
          start: () => <NavbarItem>left-item</NavbarItem>,
          end: () => <NavbarItem>right-item</NavbarItem>,
        }}
      />,
    )

    expect(wrapper.find('.s-navbar__start .s-navbar__item').text()).toBe('left-item')
    expect(wrapper.find('.s-navbar__end .s-navbar__item').text()).toBe('right-item')
  })

  test('flow', async () => {
    const wrapper = mount(
      <Navbar
        title="标题"
        flow
        v-slots={{
          start: () => <NavbarItem>left-item</NavbarItem>,
          end: () => <NavbarItem>right-item</NavbarItem>,
        }}
      />,
    )

    expect(wrapper.find('.s-navbar').classes()).toContain('s-navbar--flow')
  })

  test('custom', async () => {
    const wrapper = mount(
      <Navbar
        title="标题"
        flow
        v-slots={{
          start: () => <NavbarItem>left-item</NavbarItem>,
          end: () => <NavbarItem>right-item</NavbarItem>,
          default: () => '默认内容',
        }}
      />,
    )

    expect(wrapper.find('.s-navbar__content').text()).toBe('默认内容')
    expect(wrapper.find('.s-navbar').classes()).toContain('s-navbar--custom')
  })

  test('fixed', async () => {
    const wrapper = mount(<Navbar fixed />)

    expect(wrapper.find('.s-navbar').classes()).toContain('s-navbar--fixed')
    expect(wrapper.find('.s-navbar-pit').exists()).toBe(true)
  })

  test('statusBar', async () => {
    const wrapper = mount(<Navbar statusBar fixed />)

    expect(wrapper.find('.s-navbar .s-status-bar').exists()).toBe(true)
    expect(wrapper.find('.s-navbar-pit .s-status-bar').exists()).toBe(true)
  })
})
