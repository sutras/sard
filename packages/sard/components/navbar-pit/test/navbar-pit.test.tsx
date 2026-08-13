import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import NavbarPit from '../navbar-pit.vue'

describe('NavbarPit', () => {
  test('basic', () => {
    const wrapper = mount(<NavbarPit />)

    expect(wrapper.find('.s-navbar-pit').exists()).toBe(true)
    expect(wrapper.find('.s-navbar-pit__content').exists()).toBe(true)
    expect(wrapper.find('.s-status-bar').exists()).toBe(false)
  })

  test('statusBar', () => {
    const wrapper = mount(<NavbarPit statusBar />)

    expect(wrapper.find('.s-status-bar').exists()).toBe(true)
    expect(wrapper.find('.s-status-bar').attributes('style')).toContain('height: 0px;')
  })
})
