import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Badge from '../badge.vue'

describe('Badge', () => {
  test('renders wrapped badge with slot content and fixed modifier', async () => {
    const wrapper = mount(<Badge value={5}>{h('div', { class: 'box' }, 'content')}</Badge>)

    const root = wrapper.find('.s-badge__wrapper')
    const badge = wrapper.find('.s-badge')

    expect(root.exists()).toBe(true)
    expect(root.find('.box').exists()).toBe(true)
    expect(badge.text()).toBe('5')
    expect(badge.classes()).toEqual(expect.arrayContaining(['s-badge', 's-badge--fixed']))
  })

  test('max value text updates when max changes', async () => {
    const wrapper = mount(<Badge value={100}>{h('div', { class: 'box' })}</Badge>)

    expect(wrapper.find('.s-badge').text()).toBe('99+')

    await wrapper.setProps({
      max: 200,
    })

    expect(wrapper.find('.s-badge').text()).toBe('100')
  })

  test('showZero toggles hidden modifier and rendered text', async () => {
    const wrapper = mount(<Badge value={0} />)

    expect(wrapper.classes()).toContain('s-badge--zero-hide')
    expect(wrapper.text()).toBe('')

    await wrapper.setProps({
      showZero: true,
    })

    expect(wrapper.classes()).not.toContain('s-badge--zero-hide')
    expect(wrapper.text()).toBe('0')
  })

  test('dot mode renders dot modifier without badge text', async () => {
    const wrapper = mount(<Badge dot>{h('div', { class: 'box' })}</Badge>)

    const badge = wrapper.find('.s-badge')

    expect(badge.classes()).toContain('s-badge--dot')
    expect(badge.text()).toBe('')
  })

  test('custom colors apply to badge styles', async () => {
    const wrapper = mount(<Badge value={5} color="red" textColor="white" />)

    const style = wrapper.attributes('style')

    expect(style).toContain('background: red;')
    expect(style).toContain('color: white;')
  })

  test('renders standalone badge without wrapper slot container', async () => {
    const wrapper = mount(<Badge value={5} />)

    expect(wrapper.classes()).toContain('s-badge')
    expect(wrapper.find('.s-badge__wrapper').exists()).toBe(false)
  })

  test('fixed prop applies without default slot content', async () => {
    const wrapper = mount(<Badge value={5} fixed />)

    expect(wrapper.classes()).toContain('s-badge--fixed')
  })
})
